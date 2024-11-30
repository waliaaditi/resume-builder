import React, { useEffect } from 'react';
import { Heading, HStack, Button, Box, Flex, Link, Image, Text, VStack } from '@chakra-ui/react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { auth } from '../congif/firebase.js';
import { useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom.js';

function Homepage() {
    const setUser = useSetRecoilState(userAtom);
    const navigate=useNavigate()
    const user=auth.currentUser
    // console.log(user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/users/getUser');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const user = await response.json();
                // console.log(user);
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <Flex height={'full'}>
                <HStack>
                    <Flex
                        marginTop={'50px'}
                        maxWidth={'650px'}
                        width={'600px'}
                        alignItems={'center'}
                        borderRadius={'6px'}
                        justifyContent={'center'}
                        style={{ backgroundImage: 'url(https://res.cloudinary.com/dyylkrsak/image/upload/v1712769056/B7023-How-to-Build-my-Resume-Social_wtmotc.png)' }}
                    >
                        <Image src="https://res.cloudinary.com/dyylkrsak/image/upload/v1712768837/Asset-1_2x-1_yf5eco.webp" maxHeight={'600px'} maxW={'400px'} />
                    </Flex>
                    <VStack marginLeft={'60px'} alignItems={'start'} spacing={5}>
                        <Heading marginTop={'2px'} color={'#000000'}>Online Resume Builder</Heading>
                        <Text fontSize={'xl'} color={'#000000'}>Easily create the perfect resume for any job using our best-in-class resume builder platform.</Text>
                        <Button onClick={()=>{navigate('/templates')}}
                        backgroundColor={'#FB6D48'} size={'lg'} color={'#ffffff'} _hover={{ backgroundColor: '#994D1C' }} marginTop={'15px'} marginBottom={'15px'}>Create My Resume Now</Button>
                        <Flex color={'#8E7AB5'}>
                            <Box marginRight={'18px'}>
                                <Heading>
                                    <FontAwesomeIcon icon={faArrowUp} /> 2x
                                </Heading>
                                <Text>More Interviews</Text>
                            </Box>
                            <Heading width={'3px'} backgroundColor={'#000000'}></Heading>
                            <Box marginLeft={'8px'}>
                                <Heading>
                                    <FontAwesomeIcon icon={faArrowUp} /> 25%
                                </Heading>
                                <Text>More Job Offers</Text>
                            </Box>
                        </Flex>
                    </VStack>
                </HStack>
            </Flex>
        </>
    );
}

export default Homepage;
