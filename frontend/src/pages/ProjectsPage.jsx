import React, { useState } from 'react';
import { ArrowForwardIcon, ArrowRightIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import projectsAtom from '../Atoms/projectsAtom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import educationAtom from '../Atoms/educationAtom';
import skillAtom from '../Atoms/skillAtom';
import detailsAtom from '../Atoms/detailsAtom';
import professionalAtom from '../Atoms/professionalAtom';
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler';
function ProjectsPage() {
    const [projects,setProjects]=useRecoilState(projectsAtom)
    const [inputs, setInputs] = useState([
        {
            projectName:"",
            projectDescription: ""
        }
    ]);
    const [count, setCount] = useState(1);
    const [show,setShow]=useState(false)
    const details=useRecoilValue(detailsAtom)
    const experience=useRecoilValue(professionalAtom)
    const education=useRecoilValue(educationAtom)
    const skills=useRecoilValue(skillAtom)
    const storedData = localStorage.getItem('template');
    const template = JSON.parse(storedData);
    const navigate=useNavigate()
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        console.log(name,value);
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setInputs(newInputs);
        setShow(true)
    };
    const handleEditorChange = (content, index) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], projectDescription: content };
        setInputs(newInputs);
        setShow(true)
    };

    const handleAddForm = () => {
        const newInputs = [...inputs];
        setInputs(newInputs);
        setProjects(newInputs)
        navigate('/editor/summary')
    };
    const handleRemoveLast = () => {
        if (inputs.length >=1) {
            const newInputs = [...inputs.slice(0, -1)]; // Remove the last item from the array
            setInputs(newInputs);
            setProjects(newInputs); // Assuming you want to update skillAtom here
            setCount(count-1)
        }
       
    };
    const handleSkip = () => {
        console.log("skip this page");
        navigate('/editor/summary')
        console.log(projects)
    };
    BeforeUnloadHandler()
    return (
        <HStack>
        <Flex width={'100%'} minWidth={'600px'} alignSelf={'baseline'}>
            <VStack width='fit-content'>
                <Flex alignItems='flex-end' marginLeft={'280px'}>
                    <Button backgroundColor={'gray.200'} size={'sm'} _hover={{ backgroundColor: 'gray.500' }}
                        borderRadius={"24px"} rightIcon={<ArrowRightIcon />} marginRight={'10px'} onClick={handleSkip}>Skip</Button>
                    <Button backgroundColor={'#DD5746'} size={'sm'} _hover={{ backgroundColor: '#DC6B19' }}
                        borderRadius={"24px"} rightIcon={<ArrowForwardIcon />} onClick={handleAddForm}>Next</Button>
                </Flex>
                
                <VStack borderRadius={"8px"} borderTopWidth={"2px"} borderTopColor={"red"} alignItems={'start'} padding={'3px'}>
                    <Box marginTop={"4px"} >
                        <Text fontSize={"xl"}>Projects</Text>
                    </Box>
                    <Flex marginTop={"1px"} justifyContent={'space-between'}>
                        <Text maxWidth={"350px"} color={"gray.600"}>
                            Tell us about your projects
                        </Text>
                    </Flex>
                    {[...Array(count)].map((_, index) => (
                        <VStack key={index} borderColor={'gray.200'} borderWidth={'2px'} padding={'4px'} margin={'6px'}>
                                <FormControl>
                                    <FormLabel>Project Name:</FormLabel>
                                    <Input
                                        type="text"
                                        name="projectName"
                                        w={300}
                                        borderColor="gray.500"
                                        value={inputs[index]?.projectName}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description:</FormLabel>
                                    <Editor
                                        apiKey="jp2h95ho9o1mh78250ezivqseuhys4ylj0ldue8oz2w3odie"
                                        initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                            height: 300,
                                            menubar: true,
                                            plugins: [
                                                'advlist',
                                                'autolink',
                                                'lists',
                                                'link',
                                                'image',
                                                'charmap',
                                                'preview',
                                                'anchor',
                                                'searchreplace',
                                                'visualblocks',
                                                'code',
                                                'insertdatetime',
                                                'media',
                                                'table',
                                                'wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic | \
                                                alignleft aligncenter alignright | \
                                                bullist numlist outdent indent | help',
                                            content_css: '.my-custom-tinymce-editor { border-color: red; }'
                                        }}
                                        onEditorChange={(content) => handleEditorChange(content, index)}
                                    />
                                </FormControl>
                        </VStack>
                    ))}
                </VStack>
                <Flex>
                    <Button textColor={"red"} leftIcon={<SmallAddIcon />} 
                    onClick={() => {setCount(count + 1)}}>Add more skills</Button>
                    <Button textColor={'Red'} leftIcon={<DeleteIcon />} onClick={handleRemoveLast}>Remove the last one</Button>
                </Flex>
            </VStack>
        </Flex>
        <Flex >
        {
          template==='template1'?<Template1 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} skills={skills.map(skill => skill.skillName)}
          projects={show?inputs:''}
          />:<Template2 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} skills={skills.map(skill => skill.skillName)}
          projects={show?inputs:''}/>
        }
        
      </Flex>
        </HStack>
    );
}

export default ProjectsPage