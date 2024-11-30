import React from 'react'
import LogoutButton from '../components/LogoutButton.jsx'
import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom.js';

function Headers() {
    const navigate = useNavigate();
    const user=useRecoilValue(userAtom)
    return (
        <Box borderRadius={'6px'} padding={'10px'} marginTop={'20px'} mb={10} width={'full'} borderColor={'gray.400'} borderWidth={'2px'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Link onClick={()=>{navigate('/')}} fontSize={'md'}  color={'#8644A2'} fontFamily={'fantasy'} padding={'8px'} >
                    Resume Builder
                    {/* <Image width={'20px'} height={'20px'} src='https://res.cloudinary.com/dyylkrsak/image/upload/v1717610388/Resume_builder_zbtjry.png'/> Resume Builder */}
                </Link>
                {user &&
                <HStack marginRight={'20px'} spacing={'15px'}>
                    <Link onClick={()=>{navigate('/templates')}} color={'#000000'} _hover={{ color: '#704264' }}>
                        Resume Templates</Link>
                    <Link color={'#000000'} _hover={{ color: '#704264' }}
                    onClick={()=>{navigate('/dashboard')}}>Dashboard</Link>
                    <Link color={'#000000'} _hover={{ color: '#704264' }}
                    onClick={()=>{navigate('/account')}} >My Account</Link>
                    <Button onClick={()=>{navigate('/templates')}}
                    backgroundColor={'#FFAF45'} color='white' borderColor={'#FFC94A'}  borderWidth={'2px'} borderRadius={'6px'} padding={'5px'} overflow={'hidden'} _hover={{ backgroundColor:"#FFC470" }}>Build My Resume</Button>
                    <LogoutButton />
                </HStack>
}
            </Flex>
        </Box>
    );
}

export default Headers;
