import React, { useState } from 'react';
import { Flex, Heading, Stack, Box, FormControl, FormLabel, Input, Link, Text, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, sendPasswordResetEmail, getAuth } from 'firebase/auth'; // Update import to remove unnecessary imports
import { auth } from '../congif/firebase';
import { useSetRecoilState ,useRecoilState} from 'recoil';
import userAtom from '../Atoms/userAtom';
import authScreenAtom from '../Atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [forgetPassword,setForgetPassword]=useState(false)
  const showToast=useShowToast()
  const setAuthScreen=useSetRecoilState(authScreenAtom)
  const [user,setUser]=useRecoilState(userAtom)
  const navigate=useNavigate()
  const sendTokenToBackend = async (user) => {
    try {
      const idToken = await user.getIdToken(); // Get the Firebase ID token
      console.log(idToken);
      console.log(user.email);
      const response=await fetch('/api/users/login',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({token:idToken,email:user.email})
      })
      const data=await response.json()
      console.log(data);
      if(response.ok){
        localStorage.removeItem("user-threads");
        localStorage.setItem("user-threads", JSON.stringify(user));
        setUser(user)
      }
      else{
        showToast('error',data.error,"error"); 
        setLoading1(false)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error sending token to backend:', error.message);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential =await signInWithEmailAndPassword(auth, input.email, input.password);
      const user=userCredential.user;
      await sendTokenToBackend(user)
    } catch (error) {
      console.error('Error logging in:', error.message);
      showToast("error",error.message,'error')
      // Provide feedback to the user
    } finally {
      setLoading(false);
    }
  };
  const handleLoginWithGoogle = async () => {
    setLoading1(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user=userCredential.user;
      await sendTokenToBackend(user)
      console.log(user);
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex align="center" justify="center" textColor="black">
      <Stack bgColor={'gray.200'} py={6} px={6} spacing={8} mx="auto" maxW="lg" borderColor={'gray'} borderWidth={'2px'} borderRadius={'8px'}>
        <Stack align="center">
          <Heading textAlign="center" size="xl"> Login</Heading>
        </Stack>
        <Box>
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  borderColor="black"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
            </Box>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  borderColor="black"
                  onChange={(e) => setInput({ ...input, password: e.target.value })}
                  value={input.password}
                  _hover={{ borderColor: 'gray.800' }}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    backgroundColor="gray.900"
                    onClick={() => setShowPassword((show) => !show)}
                    _hover={{ backgroundColor: 'gray.800' }}
                  >
                    {showPassword ? <ViewIcon color={'whitesmoke'} /> : <ViewOffIcon color={'whitesmoke'} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button textColor={'#1679AB'} onClick={()=>{navigate('/reset')}}>Forget Password?</Button>
            <Stack>
              <Button
                loadingText="Logging In"
                backgroundColor="#008DDA"
                size="lg"
                _hover={{
                  bg: '#41C9E2',
                }}
                color="white"
                onClick={handleLogin}
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
            <Stack>
              <Button
                loadingText="Logging In"
                backgroundColor="#008DDA"
                size="lg"
                _hover={{
                  bg: '#41C9E2',
                }}
                color="white"
                onClick={handleLoginWithGoogle}
                isLoading={loading1}
              >
                Login With Google
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Not a user?{' '}
                <Link color="blue.400" onClick={() => setAuthScreen('signup')}>
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginPage;
