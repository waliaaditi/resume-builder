import React from 'react'
import { Box, Image, Link ,Flex, Text,Heading} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import templateAtom from '../Atoms/templateAtom'
import { useNavigate } from 'react-router-dom'
function SelectTemplate() {
    const [template,setTemplate]=useRecoilState(templateAtom)
    const navigate=useNavigate()
    const handleClick=(input)=>{
        localStorage.setItem('template',JSON.stringify(input))
        navigate('/editor/details')
    }
  return (
    <Box justifyContent={'center'} marginTop={'40px'} marginLeft={10}>
        <Heading fontFamily={'bold'} textColor={'#7469B6'}>Select Your Template:</Heading>
        <Flex justifyContent={'center'} marginTop={'20px'}>
        <Box borderWidth={'1px'} borderColor={'orange'}>
        <Link onClick={()=>handleClick('template1')} >
            <Image width={'300px'} height={'400px'} src='https://res.cloudinary.com/dyylkrsak/image/upload/v1714379272/Screenshot_2024-04-27_200630_l0enaf.png' />
        </Link>
        </Box>
        <Box marginLeft={'30px'} borderColor={'#F7418F'} borderWidth={'1px'}>
        <Link onClick={()=>handleClick('template2')} >
            <Image width={'300px'} height={'400px'} src='https://res.cloudinary.com/dyylkrsak/image/upload/v1714379300/getPdfThumbnail_agsgoz.jpg' />
        </Link>
        </Box>
        </Flex>
    </Box>
  )
}

export default SelectTemplate