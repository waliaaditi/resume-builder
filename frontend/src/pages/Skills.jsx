import React, { useState } from 'react';
import { ArrowForwardIcon, ArrowRightIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import skillAtom from '../Atoms/skillAtom';
import { useNavigate } from 'react-router-dom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import detailsAtom from '../Atoms/detailsAtom';
import professionalAtom from '../Atoms/professionalAtom';
import educationAtom from '../Atoms/educationAtom';
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler';
function Skills() {
    const [inputs, setInputs] = useState([{ skillName: "" }]);
    const [count, setCount] = useState(1);
    const [show,setShow]=useState(false)
    const [skill, setSkill] = useRecoilState(skillAtom);
    const details=useRecoilValue(detailsAtom)
    const experience=useRecoilValue(professionalAtom)
    const education=useRecoilValue(educationAtom)
    const storedData = localStorage.getItem('template');
    const template = JSON.parse(storedData);
    const navigate=useNavigate()
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setInputs(newInputs);
        setShow(true)
    };

    const handleSkip = () => {
        console.log('Skipping this page');
        navigate('/editor/projects');
    };

    const handleAddForm = () => {
        // console.log(inputs);
        // console.log('skill',skill);
        const newInputs = [...inputs];
        setInputs(newInputs);
        setSkill(newInputs); // Assuming you want to update skillAtom here
        navigate('/editor/projects');
    };
    const handleRemoveLast = () => {
        if (inputs.length >= 1) {
            const newInputs = [...inputs.slice(0, -1)]; // Remove the last item from the array
            setInputs(newInputs);
            setSkill(newInputs); // Assuming you want to update skillAtom here
            setCount(count-1)
        }
    };
  BeforeUnloadHandler()
    return (
        <HStack>
        <Flex width={'100%'} minWidth={'600px'} alignSelf={'baseline'} marginTop={'20px'}>
            <VStack width='fit-content'>
                <Flex alignItems='flex-end' marginLeft={'280px'}>
                    <Button backgroundColor={'gray.200'} size={'sm'} _hover={{ backgroundColor: 'gray.500' }}
                        borderRadius={"24px"} rightIcon={<ArrowRightIcon />} marginRight={'10px'} onClick={handleSkip}>Skip</Button>
                    <Button backgroundColor={'#DD5746'} size={'sm'} _hover={{ backgroundColor: '#DC6B19' }}
                        borderRadius={"24px"} rightIcon={<ArrowForwardIcon />} onClick={handleAddForm}>Next</Button>
                </Flex>
                <VStack borderRadius={"8px"} borderTopWidth={"2px"} borderTopColor={"red"} alignItems={'start'} padding={'3px'}>
                    <Flex marginTop={"4px"} textAlign={'center'}>
                        <Flex borderRadius={'24px'} backgroundColor={'#50C4ED'} width={'10px'} height={'10px'} marginTop={'9px'} marginRight={'5px'}/>
                        <Text fontSize={"xl"}>Key Skills</Text>
                    </Flex>
                    <Flex marginTop={"1px"} justifyContent={'space-between'}>
                        <Text color={"gray.600"}>
                            Add relevant professional key skills and proficiencies.
                        </Text>
                    </Flex>
                    {[...Array(count)].map((_, index) => (
                        <VStack borderWidth={'2px'} borderColor={'gray.200'} padding={'10px'} width={'500px'} key={index}>
                            <Flex marginRight={'250px'}>
                                <FormControl>
                                    <FormLabel>Skill</FormLabel>
                                    <Input
                                        type='text'
                                        name={`skillName`}
                                        value={inputs[index]?.skillName}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </FormControl>
                            </Flex>
                        </VStack>
                    ))}
                </VStack>
                <Flex>
                    <Button textColor={"red"} leftIcon={<SmallAddIcon />} onClick={() => setCount(count + 1)}>Add more skills</Button>
                    <Button textColor={'Red'} leftIcon={<DeleteIcon />} onClick={handleRemoveLast}>Remove the last one</Button>
                </Flex>
            </VStack> 
        </Flex>
        <Flex >
        {
          template==='template1'?<Template1 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} 
          skills={show?inputs.map(input => input.skillName):''}
          />:<Template2 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} 
          skills={show?inputs.map(input => input.skillName):''}/>
        }
        
      </Flex>
        </HStack>
    );
}

export default Skills;
