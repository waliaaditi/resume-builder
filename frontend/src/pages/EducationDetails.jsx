import React, { useState } from 'react';
import { ArrowForwardIcon, ArrowRightIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import educationAtom from '../Atoms/educationAtom';
import detailsAtom from '../Atoms/detailsAtom';
import professionalAtom from '../Atoms/professionalAtom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import templateAtom from '../Atoms/templateAtom';
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler';
function EducationDetails() {
    const [inputs, setInputs] = useState([
        {
            school: "",
            location: "",
            startDate: "",
            endDate: "",
            university: "",
            degree: "",
            fieldOfStudy:"",
            description: ""
        }
    ]);
    const [education,setEducation]=useRecoilState(educationAtom)
    const details=useRecoilValue(detailsAtom)
    const experience=useRecoilValue(professionalAtom)
    const storedData = localStorage.getItem('template');
    const template = JSON.parse(storedData);
    const [show,setShow]=useState(false);
    const [count, setCount] = useState(1);
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
        newInputs[index] = { ...newInputs[index], description: content };
        setInputs(newInputs);
        setShow(true)
    };

    const handleAddForm = () => {
        console.log(education);
        const newInputs = [...inputs];
        setInputs(newInputs);
        setEducation(newInputs)
        navigate('/editor/skills')
    };
    const handleRemoveLast = () => {
        if (inputs.length >=1) {
            const newInputs = [...inputs.slice(0, -1)]; // Remove the last item from the array
            setInputs(newInputs);
            setEducation(newInputs); // Assuming you want to update skillAtom here
            setCount(count-1)
        }
       
    };
    const handleSkip = () => {
        console.log("skip this page");
        navigate('/editor/skills')
    };
    BeforeUnloadHandler()
    return (
        <HStack>
        <Flex width={'100%'} minWidth={'600px'} alignSelf={'baseline'}  marginTop={'30px'}>
            <VStack width='fit-content'>
                <Flex alignItems='flex-end' marginLeft={'280px'}>
                    <Button backgroundColor={'gray.200'} size={'sm'} _hover={{ backgroundColor: 'gray.500' }}
                        borderRadius={"24px"} rightIcon={<ArrowRightIcon />} marginRight={'10px'} onClick={handleSkip}>Skip</Button>
                    <Button backgroundColor={'#DD5746'} size={'sm'} _hover={{ backgroundColor: '#DC6B19' }}
                        borderRadius={"24px"} rightIcon={<ArrowForwardIcon />} onClick={handleAddForm}>Next</Button>
                </Flex>
                
                <VStack borderRadius={"8px"} borderTopWidth={"2px"} borderTopColor={"red"} alignItems={'start'} padding={'3px'}>
                    <Box marginTop={"4px"} >
                        <Text fontSize={"xl"}>Education</Text>
                    </Box>
                    <Flex marginTop={"1px"} justifyContent={'space-between'}>
                        <Text maxWidth={"350px"} color={"gray.600"}>
                            Add your most relevant education, including programs you're currently enrolled in.
                        </Text>
                    </Flex>
                    {[...Array(count)].map((_, index) => (
                        <VStack key={index} borderColor={'gray.200'} borderWidth={'2px'} padding={'4px'} margin={'6px'}>
                            <Flex marginTop={"20px"}>
                                <FormControl>
                                    <FormLabel>School Name:</FormLabel>
                                    <Input
                                        type="text"
                                        name="school"
                                        borderColor="gray.500"
                                        value={inputs[index]?.school}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                                <FormControl marginLeft={"12px"}>
                                    <FormLabel>School Location:</FormLabel>
                                    <Input
                                        type="text"
                                        name="location"
                                        borderColor="gray.500"
                                        value={inputs[index]?.location}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel>School Start Date:</FormLabel>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        width={'230px'}
                                        borderColor="gray.500"
                                        value={inputs[index]?.startDate}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                                <FormControl marginLeft="12px">
                                    <FormLabel>School End Date:</FormLabel>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        width={'230px'}
                                        borderColor="gray.500"
                                        value={inputs[index]?.endDate}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel>Degree:</FormLabel>
                                    <Input
                                        type="text"
                                        name="degree"
                                        width={'230px'}
                                        borderColor="gray.500"
                                        value={inputs[index]?.degree}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                                <FormControl marginLeft="12px">
                                    <FormLabel>Field Of Study:</FormLabel>
                                    <Input
                                        type="text"
                                        name="fieldOfStudy"
                                        width={'230px'}
                                        borderColor="gray.500"
                                        value={inputs[index]?.fieldOfStudy}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel marginLeft={'45px'}>Description:</FormLabel>
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
                                            content_css: '.my-custom-tinymce-editor { border-color: red; }',
                                        }}
                                        onEditorChange={(content) => handleEditorChange(content, index)}
                                    />
                                </FormControl>
                            </Flex>
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
        <Flex alignSelf={'baseline'}>
      {
        template==='template1'?<Template1 name={details.firstName+details.lastName} email={details.email} linkedin={details.linkedin}
        phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
        address={details.address} experience={experience} education={show?inputs:''}
        />:<Template2 name={details.firstName+details.lastName} email={details.email} linkedin={details.linkedin}
        phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
        address={details.address} experience={experience} education={show?inputs:''}/>
      }
      
    </Flex>
        </HStack>
    );
}

export default EducationDetails;
