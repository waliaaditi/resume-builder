import React, { useState } from 'react';
import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl,HStack,Text, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState,useRecoilValue } from 'recoil';
import summaryAtom from '../Atoms/summaryAtom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import detailsAtom from '../Atoms/detailsAtom';
import professionalAtom from '../Atoms/professionalAtom';
import educationAtom from '../Atoms/educationAtom';
import skillAtom from '../Atoms/skillAtom';
import projectsAtom from '../Atoms/projectsAtom';
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler';
function SummaryPage() {
    const [input, setInput] = useState(
        {
            summary:"",
        });
    const [summary,setSummary]=useRecoilState(summaryAtom)
    const details=useRecoilValue(detailsAtom)
    const experience=useRecoilValue(professionalAtom)
    const education=useRecoilValue(educationAtom)
    const skills=useRecoilValue(skillAtom)
    const projects=useRecoilValue(projectsAtom)
    const storedData=localStorage.getItem('template')
    const template=JSON.parse(storedData)
    const navigate=useNavigate()
    const handleEditorChange = (content) => {
        setInput({summary:content});
    };

    const handleAddForm = () => {
        // console.log(input);
        setSummary(input)
        navigate('/success')
    }
    console.log(input.summary);
    const handleSkip = () => {
        console.log("skip this page");
        console.log(summary);
        navigate('/success')
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
                    <Flex marginTop={"4px"} >
                        <Box width={'8px'} h={'8px'} borderRadius={'full'} bgColor={'red'} marginTop={2.5}></Box>
                        <Text fontSize={"xl"} marginLeft={'6px'}>Summary</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                        <Text maxWidth={"350px"} color={"gray.600"} marginLeft={'14px'}>
                        Summarize your work experience, education and skills here.
                        </Text>
                    </Flex>
                                <FormControl>
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
                                        onEditorChange={(content) => handleEditorChange(content)}
                                    />
                                </FormControl>
                        </VStack>
                </VStack>
        </Flex>
        <Flex >
        {
          template==='template1'?<Template1 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} 
          skills={skills.map(skill => skill.skillName)} projects={projects} summary={input.summary}
          />:<Template2 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education}
           skills={skills.map(skill => skill.skillName)} projects={projects} summary={input.summary}/>
        }
        
      </Flex>
        </HStack>
    );
}

export default SummaryPage