import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import useShowToast from '../hooks/useShowToast';
import {
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail,
    sendEmailVerification,
    getAuth
} from "firebase/auth";

const reauthenticate = (currentPassword) => {
    const user = getAuth().currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
}

const changePassword = async (currentPassword, newPassword) => {
    await reauthenticate(currentPassword);
    const user = getAuth().currentUser;
    return updatePassword(user, newPassword);
}

// const sendVerificationEmail = async (user, newEmail) => {
//     await sendEmailVerification(user);
//     return new Promise((resolve, reject) => {
//         const intervalId = setInterval(async () => {
//             await user.reload();
//             if (user.emailVerified) {
//                 clearInterval(intervalId);
//                 resolve();
//             }
//         }, 1000);

//         setTimeout(() => {
//             clearInterval(intervalId);
//             reject(new Error('Email verification timed out'));
//         }, 60000);
//     });
// }

// const changeEmail = async (currentPassword, newEmail) => {
//     const user = getAuth().currentUser;
//     if (user.providerData[0].providerId === "password") {
//         await reauthenticate(currentPassword);
//     }
//     await sendVerificationEmail(user, newEmail);
//     await updateEmail(user, newEmail);
// }

function Account() {
    const showToast = useShowToast();
    const auth = getAuth();
    const user = auth.currentUser;

    const [data, setData] = useState({
        firstname: user?.displayName?.split(' ')[0] || "",
        lastname: user?.displayName?.split(' ')[1] || "",
        email: user?.email || "",
        newPassword: ""
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (user && user.providerData[0].providerId === "google.com") {
            setIsAvailable(false);
        }
    }, [user]);

    const handleSave = async () => {
        try {
            if (!user) {
                showToast("No user is signed in", "error");
                return;
            }

            const newDisplayName = `${data.firstname} ${data.lastname}`.trim();

            // Update display name (if changed)
            if (newDisplayName && newDisplayName !== user.displayName) {
                await updateProfile(user, { displayName: newDisplayName });
                const response=await fetch('/api/users/updateUser',{
                    method:"POST",
                    headers:{
                      "Content-Type": "application/json",
                    },
                    body:JSON.stringify({name:newDisplayName})
                  })
                  const data=await response.json()
                  console.log(data);
                  if(response.ok){
                    localStorage.removeItem("user-threads");
                    localStorage.setItem("user-threads", JSON.stringify(user));
                    console.log('user updated in backend successfully');
                  }
                showToast("Display name updated successfully!", "success");
            }

            // Update email (if changed)
            // if (data.email && data.email !== user.email) {
            //     await changeEmail(currentPassword, data.email);
            //     showToast("Email updated successfully!", "success");
            // }

            // Update password (if changed and available)
            if (data.newPassword && isAvailable) {
                if (!currentPassword) {
                    showToast("Please enter your current password", "error");
                    return;
                }
                await changePassword(currentPassword, data.newPassword);
                showToast("Password updated successfully!", "success");
            }

            onClose();
        } catch (error) {
            console.error('Error in handleSave:', error);
            showToast(error.message || "An error occurred. Please try again.", "error");
        }
    };

    return (
        <Flex justifyContent={'center'}>
            <VStack marginTop={'100px'} marginLeft={'50px'} fontFamily={'cursive'} width={'600px'}>
                <Flex width={'600px'} marginBottom={'15px'} justifyContent={'space-between'}>
                    <Heading fontFamily={'cursive'}>My Account</Heading>
                    <Button textColor={'#3ABEF9'} shadow={'revert'} borderColor={'gray.200'} onClick={onOpen}
                        borderWidth={3} bgColor={'gray.100'} borderRadius={'6px'} >Edit Profile</Button>
                </Flex>
                <Box marginLeft={1} width={600}>
                    <Flex marginBottom={'3px'} fontSize={'lg'}>
                        <Text fontWeight={'bold'}>Name: </Text>
                        <Text textColor={'gray.600'}>{user?.displayName}</Text>
                    </Flex>
                    <Flex fontSize={'lg'} marginBottom={'3px'}>
                        <Text fontWeight={'bold'}>Email: </Text>
                        <Text textColor={'gray.600'}>{user?.email}</Text>
                    </Flex>
                </Box>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My Account</ModalHeader>
                    <Text marginLeft={'15px'} marginBottom={'5px'}>Email Can't be changed !</Text>
                    <ModalCloseButton />
                    <Box paddingLeft={15} paddingRight={15}>
                        <Flex>
                            <FormControl mb={4} borderColor={"darkgray"}>
                                <FormLabel>First Name: </FormLabel>
                                <Input
                                    type="text"
                                    value={data.firstname}
                                    placeholder="firstname"
                                    borderColor={"black"}
                                    onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                    _hover={{ borderColor: 'gray.900' }}
                                />
                            </FormControl>
                            <FormControl isRequired mb={4} marginLeft={"10px"} borderColor={"darkgray"}>
                                <FormLabel>Last Name:</FormLabel>
                                <Input
                                    type="text"
                                    borderColor={"black"}
                                    value={data.lastname}
                                    placeholder="lastname"
                                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                    _hover={{ borderColor: 'gray.900' }}
                                />
                            </FormControl>
                        </Flex>
                        <FormControl isRequired mb={4} marginLeft={"2px"} borderColor={"darkgray"}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                readOnly
                                borderColor={"black"}
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                _hover={{ borderColor: 'gray.900' }}
                            />
                        </FormControl>
                        {isAvailable ? (
                            <>
                                <FormControl isRequired mb={4} marginLeft={"10px"} borderColor={"darkgray"}>
                                    <FormLabel>Current Password:</FormLabel>
                                    <Input
                                        type="password"
                                        borderColor={"black"}
                                        placeholder="Current password"
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        _hover={{ borderColor: 'gray.900' }}
                                    />
                                </FormControl>
                                <FormControl isRequired mb={4} marginLeft={"10px"} borderColor={"darkgray"}>
                                    <FormLabel>New Password:</FormLabel>
                                    <Input
                                        type="password"
                                        borderColor={"black"}
                                        placeholder="New password"
                                        onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                                        _hover={{ borderColor: 'gray.900' }}
                                    />
                                </FormControl>
                            </>
                        ) : (
                            <Text>You signed in with Google, so password can't be changed</Text>
                        )}
                    </Box>
                    <ModalFooter>
                        <Button backgroundColor={'#008DDA'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type="submit" rightIcon={<MdSend />}
                            onClick={handleSave}
                            _hover={{ bg: '#41C9E2' }} backgroundColor={'#008DDA'}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex justifyContent={'center'} width={'full'} bgColor={'gray.300'} position={'fixed'} bottom={'1px'} height={'40px'}>
                <Text marginTop={'8px'} fontFamily={'cursive'}>@ 2024 RB.com. All right reserved.</Text>
            </Flex>
        </Flex>
    );
}

export default Account;
