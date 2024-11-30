import { Flex, Heading, Stack, Box, FormControl, FormLabel, Input, Link, Text, InputGroup, InputRightElement, Button, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from "recoil";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreenAtom from '../Atoms/authAtom';
import userAtom from '../Atoms/userAtom';
import { getAuth, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,updateProfile } from 'firebase/auth'; // Update import for createUserWithEmailAndPassword
import { auth } from '../congif/firebase';
import useShowToast from '../hooks/useShowToast';

function SignupPage() {
    const setUser = useSetRecoilState(userAtom);
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const toast = useToast();
    const showToast=useShowToast()
    const [loading,setLoading]=useState(false)
    const [loading1,setLoading1]=useState(false)
    const sendTokenToBackend = async (user) => {
        try {
            const idToken = await user.getIdToken();
            console.log(idToken,user.email,user.displayName);
            const response=await fetch('/api/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: idToken, email: user.email, displayName:user.displayName})
            });
            console.log(response);
            if (!response.ok) {
                const data=await response.json()
                showToast('error',data.error,"error");
                return 
            }
            const data=await response.json()
            console.log(`data:${data}`);
            localStorage.removeItem("user-threads");
            localStorage.setItem("user-threads", JSON.stringify(user));
            setUser(user)
        } catch (error) {
            console.log(error.message);
            toast({
                title: "Error",
                description:error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: input.name });
            console.log(user);
            await sendTokenToBackend(user);
            toast({
                title: "Success",
                description: "Signed up successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error signing up:', error.message);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        finally{
            setLoading(false)
        }
    }

    const handleSignUpWithGoogle = async () => {
        setLoading1(true)
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log('User signed up with Google successfully:', user);
            await sendTokenToBackend(user);
        } catch (error) {
            console.error('Error signing up with Google:', error.message);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        finally{
            setLoading1(false)
        }
    }

    return (
        <Flex align={"center"} justify={"center"} textColor={"black"}>
            <Stack py={6} px={6} bgColor={'gray.200'} borderRadius={8}
            spacing={8}width={300} borderWidth={2}  borderColor={'gray'} mx={"auto"} maxW={"lg"}>
                <Stack align={"center"} >
                    <Heading textAlign={"center"} size={"xl"}> Sign up</Heading>
                </Stack>
                <Box>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name:</FormLabel>
                            <Input type='text' value={input.name}
                                borderColor={'black'}
                                onChange={(e) => { setInput({ ...input, name: e.target.value }) }}
                                _hover={{ borderColor: 'gray.800' }}
                            ></Input>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type='email'
                                onChange={(e) => setInput({ ...input, email: e.target.value })}
                                value={input.email}
                                borderColor={"black"}
                                _hover={{ borderColor: 'gray.800' }}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                                    value={input.password}
                                    borderColor={"black"}
                                    _hover={{ borderColor: 'gray.800' }}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        backgroundColor={"gray.900"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack>
                            <Button
                                loadingText="submitting"
                                size={"lg"}
                                backgroundColor={'#008DDA'}
                                _hover={{
                                    bg: '#41C9E2',
                                }}
                                color={"white"}
                                onClick={handleSignUp}
                                isLoading={loading}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                        <Stack>
                            <Button
                                loadingText="submitting"
                                size={"lg"}
                                backgroundColor={'#DD5746'}
                                _hover={{
                                    bg: '#A34343',
                                }}
                                color={"white"}
                                onClick={handleSignUpWithGoogle}
                                isLoading={loading1}
                            >
                                Sign Up With Google
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default SignupPage;
