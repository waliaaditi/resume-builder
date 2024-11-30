import React, { useState } from 'react';
import { auth } from '../congif/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import useShowToast from '../hooks/useShowToast';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const showToast = useShowToast();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent! Check your inbox.');
      showToast('Message', 'Password reset email sent! Check your inbox');
      setEmail('');
    } catch (error) {
      console.log(error.message);
      showToast('error', error.message);
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="400px" mx="auto" mt="100px" p={4} borderWidth={1} 
      borderRadius="lg" boxShadow="lg" borderColor={'gray.500'}>
        <form onSubmit={handleForgetPassword}>
          <FormControl id="email" isRequired borderColor={'gray.800'}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Reset Password
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default ResetPassword;
