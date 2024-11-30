import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState ,useEffect} from 'react'
import { useRecoilState,useRecoilValue } from 'recoil'
import detailsAtom from '../Atoms/detailsAtom'
import useShowToast from '../hooks/useShowToast'
import { useAsyncValue, useNavigate } from 'react-router-dom'
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'
import templateAtom from '../Atoms/templateAtom'
import BeforeUnloadHandler from '../hooks/BeforeUnloadHandler'
function Details() {
  const storedData = localStorage.getItem('template');
  const template = JSON.parse(storedData);
  console.log(`template: ${template}`);
    const [input,setInput]=useState({
        firstName:"",
        lastName:"",
        job:"",
        phone:"",
        address:"",
        city:"",
        state:"",
        zipcode:"",
        email:"",
        linkedin:"",
    })
    const showToast=useShowToast()
    const [details,setDetails]=useRecoilState(detailsAtom)
    const navigate=useNavigate()
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(details);
        if(input.firstName=='' || input.job=='' || input.email==''){
            showToast('error','Fill all the mandatory inputs','error')
            return 
        }
        setDetails(input)
        navigate('/editor/work-history')
    }
  //   useEffect(() => {
  //     const handleBeforeUnload = (event) => {
  //         event.preventDefault();
  //         event.returnValue = ''; // This line is necessary for Chrome
  //         return ''; // This line is necessary for other browsers
          
  //     };

  //     window.addEventListener('beforeunload', handleBeforeUnload);

  //     return () => {
  //         window.removeEventListener('beforeunload', handleBeforeUnload);
  //     };
  // }, []);
  BeforeUnloadHandler()
  return (
    <HStack justifyContent={'space-between'}>
    <Flex justifyContent={'center'} alignSelf={'baseline'} marginTop={'70px'}>
        <VStack borderRadius={"8px"} borderTopWidth={"2px"} borderTopColor={"blue"} alignItems={'start'}>
        <Box marginTop={"4px"}>
            <Text fontSize={"xl"}>Personal Details</Text>
        </Box>
        <Flex marginTop={"4px"} justifyContent={'space-between'}>
            <Text maxWidth={"350px"} color={"gray.600"}>
                Get started with the basics: your name and contact information.
            </Text>
            <Button backgroundColor={'#DD5746'} _hover={{backgroundColor:'#DC6B19'}} onClick={handleClick}
            borderRadius={"24px"} >Next</Button>
        </Flex>
        <Flex marginTop={"20px"}>
        <FormControl isRequired >
                <FormLabel>First Name:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.firstName}
                  onChange={(e) => setInput({ ...input, firstName: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
              <FormControl isRequired marginLeft={"12px"}>
                <FormLabel>LastName:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.lastName}
                  onChange={(e) => setInput({ ...input, lastName: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
        </Flex>
        <Flex>
        <FormControl isRequired>
                <FormLabel>Job:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.job}
                  onChange={(e) => setInput({ ...input, job: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
              <FormControl marginLeft={"12px"}>
                <FormLabel>Phone:</FormLabel>
                <Input
                  type="number"
                  borderColor="gray.500"
                  value={input.phone}
                  onChange={(e) => setInput({ ...input, phone: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
        </Flex>
        <Flex>
        <FormControl >
                <FormLabel>Address:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.address}
                  onChange={(e) => setInput({ ...input, address: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
              <FormControl marginLeft={"12px"}>
                <FormLabel>city:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.city}
                  onChange={(e) => setInput({ ...input, city: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
        </Flex>
        <Flex>
        <FormControl>
                <FormLabel>State:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.state}
                  onChange={(e) => setInput({ ...input, state: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
              <FormControl marginLeft={"12px"}>
                <FormLabel>ZipCode:</FormLabel>
                <Input
                  type='number'
                  borderColor="gray.500"
                  value={input.zipcode}
                  onChange={(e) => setInput({ ...input, zipcode: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
        </Flex>
        <Flex>
        <FormControl isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
              <FormControl marginLeft={"12px"}>
                <FormLabel>Linkedin:</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  value={input.linkedin}
                  onChange={(e) => setInput({ ...input, linkedin: e.target.value })}
                  _hover={{ borderColor: 'gray.800' }}
                />
              </FormControl>
        </Flex>
        </VStack>
    </Flex>
    <Flex marginTop={70}>
      { template!='' && 
        template==='template1'?<Template1 name={input.firstName+ ' ' +input.lastName} email={input.email} linkedin={input.linkedin}
        phone={input.phone} state={input.state} zipcode={input.zipcode} city={input.city} job={input.job}
        address={input.address}
        />:
        <Template2 name={input.firstName?(input.lastName?input.firstName+' '+input.lastName:input.firstName):''} 
        email={input.email} linkedin={input.linkedin}
        phone={input.phone} state={input.state} zipcode={input.zipcode} city={input.city} job={input.job}
        address={input.address}/>
      }
      
    </Flex>
    </HStack>
  )
}

export default Details