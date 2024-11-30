import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VStack, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import Content from '../components/Contact';
import { getAuth } from 'firebase/auth';

function UserPage() {
    const user = getAuth().currentUser
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await fetch('/api/resume/getResumes');
                if (response.ok) {
                    const data = await response.json();
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setResumes(data);
                } else {
                    throw new Error('Failed to fetch resumes');
                }
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };
        fetchResumes(); // Call fetchResumes function when component mounts
    }, []);

   

    return (
        <Box marginLeft={'30px'} marginTop={"40px"}>
            <Flex>
                <Heading fontFamily={'cursive'} textColor={'gray.600'}>My Dashboard</Heading>
            </Flex>
            <Flex marginTop={'10px'}>
                <Text fontSize={'xl'} fontFamily={'cursive'} textColor={'gray.600'}>Welcome Back, {user.displayName}!</Text>
            </Flex>
            <Box width={'1200px'} maxW={1210} marginTop={'50px'} borderWidth={'2px'} padding={'20px'}>
                <Flex marginBottom={'4px'}>
                    <Text fontFamily={'cursive'} fontSize={'lg'}>Resumes</Text>
                </Flex>
                <Box marginBottom={'20px'} width={'1150px'} borderColor={'black'} borderWidth={'.5px'} bgColor={'black'}></Box>
                <Wrap spacing="30px">
                    <WrapItem>
                        <VStack>
                            <Text fontFamily={'cursive'}>FileName:</Text>
                            <Flex onClick={() => { navigate('/templates') }} width={'200px'} justifyContent={'center'} height={'300px'} borderRadius={'8px'} borderWidth={'2px'} borderColor={'gray'}>
                                <Text marginTop={135} fontFamily={'cursive'}><SmallAddIcon />Create New Resume</Text>
                            </Flex>
                            <Text fontFamily={'cursive'}>Created At: </Text>
                        </VStack>
                    </WrapItem>
                    {resumes && resumes.map(resume => (
                        <WrapItem key={resume._id}>
                            <VStack>
                                <Text fontFamily={'cursive'} textColor={'black'}>{resume.fileName}</Text>
                                <Flex width={'200px'}
                                    height={'300px'} borderWidth={'2px'} borderColor={'gray'} borderRadius={'8px'} overflow={'hidden'}>
                                    <Image width={'200px'} height={'300px'} style={{
                                        filter: "blur(1px)", // Adjust the blur amount as needed
                                        opacity: "100%"       // Adjust the opacity as needed
                                    }} onClick={() => { navigate(`/${resume._id}`) }}
                                        src={resume.template === 'template1' ? 'https://res.cloudinary.com/dyylkrsak/image/upload/v1714379272/Screenshot_2024-04-27_200630_l0enaf.png' : 'https://res.cloudinary.com/dyylkrsak/image/upload/v1714379300/getPdfThumbnail_agsgoz.jpg'} />
                                </Flex>
                                <Text fontFamily={'cursive'}>{resume.createdAt.substr(0, 10)}</Text>
                            </VStack>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>
            <Content/>
        </Box>
    )
}

export default UserPage;
