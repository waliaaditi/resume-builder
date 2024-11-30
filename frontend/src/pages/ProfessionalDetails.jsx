import React, { useState } from 'react';
import { ArrowForwardIcon, ArrowRightIcon,SmallAddIcon } from '@chakra-ui/icons';

import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import professionalAtom from '../Atoms/professionalAtom';
import { useNavigate } from 'react-router-dom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import detailsAtom from '../Atoms/detailsAtom';
import templateAtom from '../Atoms/templateAtom';
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler';
function ProfessionalDetails() {
    const [inputs, setInputs] = useState([{
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        workSummary: ""
    }]);
    const [send,setSend]=useState(false);
    const details =useRecoilValue(detailsAtom)
    const storedData = localStorage.getItem('template');
    const template = JSON.parse(storedData);
    const [count, setCount] = useState(1);
    const navigate=useNavigate()
    const [Professional,setProfessional]=useRecoilState(professionalAtom)
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setInputs(newInputs);
        setSend(true)
    };

    const handleEditorChange = (content, index) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], workSummary: content };
        setInputs(newInputs);
        setSend(true)
    };

    const handleAddForm = () => {
      console.log(inputs);
      const newInputs = [...inputs, {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        workSummary: ""
    }];
      setInputs(newInputs);
      setProfessional(inputs);
      navigate('/editor/education')
    };
const handleSkip=()=>{
  console.log("skip this page");
  navigate('/editor/education')
}
BeforeUnloadHandler()
    return (
        <HStack>
        <Flex width={'100%'} minWidth={'600px'} alignSelf={'baseline'} marginTop={20}>
            <VStack width='fit-content'>
                <Flex alignItems='flex-end' marginLeft={'280px'}>
                    <Button backgroundColor={'gray.200'} size={'sm'} _hover={{ backgroundColor: 'gray.500' }}
                        borderRadius={"24px"} rightIcon={<ArrowRightIcon />} marginRight={'10px'} onClick={handleSkip}>Skip</Button>
                    <Button backgroundColor={'#DD5746'} size={'sm'} _hover={{ backgroundColor: '#DC6B19' }}
                        borderRadius={"24px"} rightIcon={<ArrowForwardIcon />} onClick={handleAddForm}>Next</Button>
                </Flex>
                
                    <VStack borderRadius={"8px"} borderTopWidth={"2px"} borderTopColor={"red"} alignItems={'start'} padding={'3px'}>
                        <Box marginTop={"4px"} >
                            <Text fontSize={"xl"}>Professional Experience</Text>
                        </Box>
                        <Flex marginTop={"1px"} justifyContent={'space-between'}>
                            <Text maxWidth={"350px"} color={"gray.600"}>
                                Tell us about your most recent job
                            </Text>
                        </Flex>
                        {[...Array(count)].map((_, index) => (
                        <VStack key={index} borderColor={'gray.200'} borderWidth={'2px'} padding={'4px'} margin={'6px'}>
                            <Flex marginTop={"20px"}>
                                <FormControl>
                                    <FormLabel>Position Title:</FormLabel>
                                    <Input
                                        type="text"
                                        name="title"
                                        borderColor="gray.500"
                                        value={inputs[index]?.title}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                                <FormControl marginLeft={"12px"}>
                                    <FormLabel>Company Name:</FormLabel>
                                    <Input
                                        type="text"
                                        name="company"
                                        borderColor="gray.500"
                                        value={inputs[index]?.company}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel>Start Date:</FormLabel>
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
                                    <FormLabel>End Date:</FormLabel>
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
                            <Flex marginRight={'250px'}>
                                <FormControl>
                                    <FormLabel>Location:</FormLabel>
                                    <Input type='text'
                                        name="location"
                                        borderColor={'gray.500'}
                                        value={inputs[index]?.location}
                                        onChange={(e) => handleInputChange(index, e)}
                                        _hover={{ borderColor: 'gray.800' }}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel marginLeft={'45px'}>Work Summary:</FormLabel>
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
                                              'wordcount',
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
                            </Flex>
                        </VStack>
                      ))}
                    </VStack>
                    <Button textColor={"red"} leftIcon={<SmallAddIcon/>} 
                    marginRight={'250px'} onClick={()=>{setCount(count+1)}}>Add more work Experience</Button>
            </VStack>
        </Flex>
        <Flex marginTop={20}>
      {
        template==='template1'?<Template1 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
        phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
        address={details.address} experience={send?inputs:''}
        />:<Template2 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
        phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
        address={details.address} experience={send?inputs:''}/>
      }
      
    </Flex>
        </HStack>
    );
}

export default ProfessionalDetails;
