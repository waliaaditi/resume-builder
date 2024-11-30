import {Select, Box, Button, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import {ChromePicker} from 'react-color'
import html2pdf from 'html2pdf.js';
function ResumePage() {
    const {resumeId}=useParams();
    const [resume,setResume]=useState()
    const[color,setColor]=useState('')
    const[fontStyle,setFontStyle]=useState('sans-serif')
    const [showPicker, setShowPicker] = useState(false)
    useEffect(()=>{
        const getResume=async()=>{
            try {
                const Response = await fetch('/api/resume/getResume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ resumeId: resumeId }) // Send the resumeId as an object
                });
                if (Response.ok) {
                    const data = await Response.json();
                    setResume(data);
                }
            } catch (error) {
                console.log('Error in the resume Page', error.message);
            }
        }
        getResume()
    },[])
    const handleDownloadPDF = () => {
        const input = document.getElementById('pdf-content');
        const options = {
            filename: 'my-document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf()
          .set(options)
          .from(input)
          .save('react-page.pdf');
      };
      const handleFontChange=(e)=>{
        setFontStyle(e.target.value);
      }
      const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        // setShowPicker(!showPicker)
      };
      const togglePicker = () => {
        setShowPicker(!showPicker);
      };
  return (
    <HStack alignItems={'start'} gap={showPicker?'128px':'200px'} marginTop={'50px'}>
        {/* <Flex justifyContent={'end'}> */}
        <VStack alignItems={'end'}>
            <Flex alignItems={'center'}>
                <Text mr={4}>Font:</Text>
                <Select placeholder='Select option' value={fontStyle} width={'100px'} onChange={handleFontChange}>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="cursive">Cursive</option>
                    <option value="'Arial', sans-serif">Arial</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="'Courier New', Courier, monospace">Courier New</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Verdana', Geneva, sans-serif">Verdana</option>
                    <option value="'Helvetica', Arial, sans-serif">Helvetica</option>
                    <option value="'Calibri', sans-serif">Calibri</option>
                    <option value="'Garamond', serif">Garamond</option>
                    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                </Select>
            </Flex>
            <Flex>
                {!showPicker &&  <Button bgColor={color?color:"#E72929"} width={'150px'} _hover={{bg:'#FF204E'}} onClick={togglePicker}>Pick Color</Button> }
                {/* Display the color picker only if showPicker is true */}
                {showPicker && (
                    <Box>
                    <ChromePicker color={color} onChange={handleColorChange}/>
                    <Button  onClick={togglePicker} backgroundColor={color?color:'#E72929'} _hover={{backgroundColor:'#FF204E'}} >Set Color</Button>
                    </Box>
                 )}
            </Flex>
            <Flex>
                <Button backgroundColor={'#E72929'} _hover={{backgroundColor:'#FF204E'}} width={'150px'}  
                    onClick={handleDownloadPDF}>Download PDF</Button>
            </Flex>
             </VStack>
        {/* </Flex> */}
        <Flex justifyContent={'center'} id='pdf-content'>
        { resume &&
          resume?.template==='template1'?<Template1 name={resume?.name}
          email={resume?.email}
          linkedin={resume?.linkedin}
          phone={resume?.phone}
          state={resume?.state}
          zipcode={resume?.zipCode}
          city={resume?.city}
          job={resume?.job}
          address={resume?.address}
          experience={resume?.experience}
          education={resume?.education}
          skills={resume?.skills.map(skill => skill.skillName)}
          projects={resume?.projects}
          summary={resume?.summary}
          fontStyle={fontStyle}
          color={color}
          />:<Template2 name={resume?.name}
          email={resume?.email}
          linkedin={resume?.linkedin}
          phone={resume?.phone}
          state={resume?.state}
          zipcode={resume?.zipCode}
          city={resume?.city}
          job={resume?.job}
          address={resume?.address}
          experience={resume?.experience}
          education={resume?.education}
          skills={resume?.skills.map(skill => skill.skillName)}
          projects={resume?.projects}
          summary={resume?.summary}
          fontStyle={fontStyle}
          color={color}
          />
        }
       </Flex>
    </HStack>
  )
}

export default ResumePage