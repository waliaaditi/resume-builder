import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Box, Button, Flex, FormControl,Textarea, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { MdSend } from "react-icons/md";
import { useRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
function Contact() {
    const user=useRecoilState(userAtom)
    const navigate=useNavigate()
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({
        name: "",
        email: user.email,
        subject: "",
        message: "",
    });

    const handleSend = (e) => {
        e.preventDefault();
        if (!data.name || !data.email || !data.subject || !data.message) {
            showToast("error", "All Fields are mandatory", "error");
            return;
        }
        const templateParams = {
            from_name: data.name,
            to_name: "jayesh",
            from_email: data.email,
            subject: data.subject,
            message: data.message,
        };
        const form = document.createElement("form");
        form.style.display = "none";

        for (const key in templateParams) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = templateParams[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        emailjs.sendForm('service_tkdktbl', 'template_s4akw3l', form, 'CXS2Wzk0pkHsaU4XR')
            .then((response) => {
                setData({ name: "", email: "", subject: "", message: "" }); // Reset form data to empty strings
                console.log('Email sent successfully:', response);
                showToast("Success", "Email Sent Successfully", "success");
            })
            .catch((error) => {
                showToast("error", "Unable To Send Email", "error");
                console.error('Email failed to send:', error);
                return;
            });

    };
  return (
    <>
    <Box position="fixed" bottom="20px" right="20px" >
    <Button onClick={onOpen} borderWidth={2} borderColor={'gray.300'} borderRadius={'32px'} shadow={'initial'}>
        <FontAwesomeIcon size='xl' icon={faMessage} />
    </Button>
</Box>

<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Get in Touch!</ModalHeader>
        <ModalCloseButton />
        <Box paddingLeft={15} paddingRight={15}>
            <Text fontSize={'sm'}>
                Want to find out more about Resume Builder? Get in touch with us by filling up this form.
            </Text>
            <Flex>
                <FormControl isRequired mb={4} borderColor={"darkgray"}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={user?.displayName}
                        placeholder="Name"
                        borderColor={"black"}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        _hover={{ borderColor: 'gray.900' }}
                    />
                </FormControl>
                <FormControl isRequired mb={4} marginLeft={"10px"} borderColor={"darkgray"}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        type="email"
                        borderColor={"black"}
                        name="email"
                        placeholder="Email"
                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                        value={user.email}
                        _hover={{ borderColor: 'gray.900' }}
                    />
                </FormControl>
            </Flex>
            <FormControl isRequired mb={4} borderColor={"darkgray"}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    borderColor={"black"}
                    _hover={{ borderColor: 'gray.900' }}
                    onChange={(e) => setData({ ...data, subject: e.target.value })}
                    value={data.subject}
                />
            </FormControl>
            <FormControl isRequired mb={4} borderColor={"darkgray"}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    borderColor={"black"}
                    rows={5}
                    _hover={{ borderColor: 'gray.900' }}
                    onChange={(e) => setData({ ...data, message: e.target.value })}
                    value={data.message}
                />
            </FormControl>

        </Box>

        <ModalFooter>
            <Button backgroundColor={'#008DDA'} mr={3} onClick={onClose}>
                Close
            </Button>
            <Button type="submit" rightIcon={<MdSend />}
                _hover={{ bg: '#41C9E2' }} onClick={handleSend} backgroundColor={'#008DDA'}>
                Send Message
            </Button>
        </ModalFooter>
    </ModalContent>
</Modal>
</>
  )
}

export default Contact