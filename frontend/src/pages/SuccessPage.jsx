import { Box, Button, Flex, HStack, Image, Input, Link, Menu, MenuButton, MenuItem, MenuList, Select, Text, VStack, useSafeLayoutEffect } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import summaryAtom from '../Atoms/summaryAtom'
import html2pdf from 'html2pdf.js';
import detailsAtom from '../Atoms/detailsAtom'
import professionalAtom from '../Atoms/professionalAtom'
import educationAtom from '../Atoms/educationAtom'
import skillAtom from '../Atoms/skillAtom'
import projectsAtom from '../Atoms/projectsAtom'
import { useNavigate } from 'react-router-dom'
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'
function SuccessPage() {
  const [fileName,setFileName]=useState("");
  const summary=useRecoilValue(summaryAtom)
  const details=useRecoilValue(detailsAtom)
  const experience=useRecoilValue(professionalAtom)
  const education=useRecoilValue(educationAtom)
  const skills=useRecoilValue(skillAtom)
  const projects=useRecoilValue(projectsAtom)
  const storedData=localStorage.getItem('template')
  const [template,setTemplate]=useState(JSON.parse(storedData))
  const navigate=useNavigate()
  const handleClick=(input)=>{
    localStorage.setItem('template',JSON.stringify(input))
    setTemplate(input)
}
const handleDownloadPDF = () => {
  const input = document.getElementById('pdf-content');

  html2pdf()
    .from(input)
    .save('react-page.pdf');
};
const saveResume=async()=>{
  const resumeData={
    summary:summary.summary,
    experience:experience,
    education:education,
    skills:skills,
    name:details.firstName+' '+details.lastName,
    job:details.job,
    address:details.address,
    phone:details.phone,
    city:details.city,
    state:details.state,
    zipcode:details.zipcode,
    email:details.email,
    linkedin:details.linkedin,
    template:template,
    projects:projects,
    fileName:fileName,
  }
  try {
    const response=await fetch('/api/resume/create',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(resumeData)
    })
    if (response.ok) {
      const data = await response.json();
      console.log('Resume saved successfully:', data);
      navigate('/userpage')
  } else {
      console.error('Failed to save resume:', response);
  }
} catch (error) {
  console.error('Error saving resume:', error.message);
}
}
  return (
    <Flex justifyContent={'center'} width={'full'}>
      <VStack>
      <Text>Note: You can change the Font Style and Color at My Account section resumes by opening it.</Text>
      <Flex justifyContent={'end'} marginRight={'190px'} marginTop={10} textAlign={'center'} width={'full'} >
        <Flex gap={1} >
          <Menu >
            <MenuButton as={Button} bg={'#3ABEF9'} _hover={{bg:'#50C4ED'}} >
              Edit Section
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=>{navigate('/editor/details')}}>Personal Details</MenuItem>
              <MenuItem onClick={()=>{navigate('/editor/work-history')}}>Professional Details</MenuItem>
              <MenuItem onClick={()=>{navigate('/editor/education')}}>Educational Details</MenuItem>
              <MenuItem onClick={()=>{navigate('/editor/skills')}}>Skills </MenuItem>
              <MenuItem onClick={()=>{navigate('/editor/projects')}}>Projects</MenuItem>
              <MenuItem onClick={()=>{navigate('/editor/summary')}}>Summary</MenuItem>
            </MenuList>
          </Menu>
          <Button bg={'#3ABEF9'} _hover={{bg:'#50C4ED'}} onClick={handleDownloadPDF}>Download</Button>
          <Flex>
            <Input type='text' placeholder='Enter the file Name to save' borderColor={'gray.700'} 
            value={fileName} onChange={(e)=>{setFileName(e.target.value)}} />
            <Button bg={'#3ABEF9'} _hover={{bg:'#50C4ED'}} onClick={saveResume}>Save & Next</Button>
          </Flex>
        </Flex>
      </Flex>
      <Box >
      <Text fontSize={'md'}>Select Template:</Text>
      <HStack justifyContent={'space-between'} >
      <Flex marginRight={'150px'} alignSelf={'baseline'} marginTop={'50px'} >
      <Box borderWidth={'1px'} borderColor={'orange'} height={'310px'}>
        <Link onClick={()=>handleClick('template1')} >
            <Image width={'200px'} height={'300px'} src='https://res.cloudinary.com/dyylkrsak/image/upload/v1714379272/Screenshot_2024-04-27_200630_l0enaf.png' />
        </Link>
        </Box>
        <Box marginLeft={'30px'} borderColor={'#F7418F'} borderWidth={'1px'} height={'310px'} marginRight={'20px'}>
        <Link onClick={()=>handleClick('template2')} >
            <Image width={'200px'} height={'300px'} src='https://res.cloudinary.com/dyylkrsak/image/upload/v1714379300/getPdfThumbnail_agsgoz.jpg' />
        </Link>

        </Box>
        <Box width={'2px'} borderColor={'gray.400'} borderWidth={'2px'} height={'400px'} />
        </Flex>
      <Flex id='pdf-content'>
      {
          template==='template1'?<Template1 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education} 
          skills={skills.map(skill => skill.skillName)} projects={projects} summary={summary.summary}
          />:<Template2 name={details.firstName+' '+details.lastName} email={details.email} linkedin={details.linkedin}
          phone={details.phone} state={details.state} zipcode={details.zipcode} city={details.city} job={details.job}
          address={details.address} experience={experience} education={education}
           skills={skills.map(skill => skill.skillName)} projects={projects} summary={summary.summary}/>
        }
      </Flex>
      </HStack>
      </Box>
      </VStack>
    </Flex>
  )
}

export default SuccessPage