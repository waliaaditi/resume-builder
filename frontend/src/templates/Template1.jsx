import React from 'react';
import { Flex, Box, Heading, VStack, Text} from '@chakra-ui/react';

function Template1({ name, job, phone, address, city, state, zipcode, email, linkedin, experience, education, 
  skills, projects, summary, fontStyle,color }) {
    console.log(name);
  return (
    <Flex alignItems="center" justifyContent="center" marginTop={'20px'} overflow={'hidden'}>
      <VStack width="700px" alignItems={'start'} overflow={'hidden'}>
        <Box
          backgroundColor={color?color:"orange"}
          width="700px"
          borderTopLeftRadius="32px"
          borderBottomLeftRadius="32px"
          borderTopEndRadius="8px"
        >
          <Flex justifyContent="space-between" textColor="whitesmoke">
            <VStack padding="8px" align="start" spacing="2px" marginLeft="10px" justifyContent={'center'}>
              <Heading size="lg" textColor="whitesmoke" fontFamily={fontStyle}>
                {name!=' '?name:"Alex Carry"}
              </Heading>
              <Text fontFamily={fontStyle} fontSize={'md'}>{job ? job : 'Human Resource Manager'}</Text>
            </VStack>
            <VStack width={350} padding="8px" spacing="0.5px" textAlign={'end'} alignItems={'end'}>
              <Text fontSize={'0.8rem'} fontFamily={fontStyle}>
                {address ? address : 'Tdi lake Grove'},{city ? city : 'Sonipat'},
                {state ? state : 'haryana'},{zipcode ? zipcode : '123001'} 
              </Text>
              <Text fontSize={'0.8rem'} fontFamily={fontStyle}>
                {email ? email : 'yjayesh60@gmail.com'} | {phone ? phone : '7056156463'} </Text> 
              <Text fontSize={'0.8rem'} fontFamily={fontStyle}>{linkedin ? linkedin : 'https://github.com/jayeshyadav31'}</Text>
            </VStack>
          </Flex>
        </Box>
        <Flex alignContent={'flex-start'} fontSize={fontStyle}>
          {summary ? <Text marginLeft={'20px'} fontFamily={fontStyle} dangerouslySetInnerHTML={{ __html: summary }} /> : <Text maxW={'680px'} marginLeft={'20px'}>
            Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees and helping department managers improve employee performance.
            Worked with labor unions to negotiate compensation packages for workers. Organized new hire training initiatives as well as ongoing training to adhere to workplace safety standards. Worked with OSHA to ensure that all safety regulations are followed.</Text>}
        </Flex>
        {/*Experience Schema*/}
        <Flex textColor={color?color:"orange"} marginLeft="10px">
          <Heading size="md" whiteSpace={'nowrap'}>Professional Experience</Heading>
          <Box marginLeft="50px" marginTop="10px" height="2px" width="500px" backgroundColor={color?color:"orange"} />
        </Flex>
        <Box>
          <VStack>
            {experience
              ? experience.map((exp, index) => (
                <Box key={index} padding="8px" marginTop="10px" marginLeft="10px" width={'700px'}>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Heading size="sm" fontFamily={fontStyle}>
                        {exp.company ? exp.company : ''}{exp.location && exp.company ? ',' + exp.location : exp.location}
                      </Heading>
                      <Heading size="sm" fontFamily={fontStyle}>{exp.title}</Heading>
                    </Box>
                    <Box marginRight={'10px'}>
                      <Text fontSize={'sm'} fontFamily={fontStyle}>{exp.startDate}  {exp && exp.endDate ? '- ' + exp.endDate : exp.startDate ? "Present" : ''}</Text>
                    </Box>
                  </Flex>
                  <VStack align="start" marginTop="10px">
                    <Text fontSize="md" fontFamily={fontStyle} marginLeft={'20px'} maxW={'650px'} dangerouslySetInnerHTML={{ __html: exp.workSummary }} />
                  </VStack>
                </Box>
              ))
              : (
                <Box padding="8px" marginTop="10px" marginLeft="10px">
                  <Flex justifyContent="space-between">
                    <Box>
                      <Heading size="sm">Jim's Widget Factory, Plano, TX</Heading>
                      <Heading size="sm">Human Resources Manager</Heading>
                    </Box>
                    <Text>January 2016 - Present</Text>
                  </Flex>
                  <Box>
                    <Flex align="start" marginTop="10px" maxWidth="880px">
                      <Box bg="orange" width="6px" height="6px" borderRadius="full" marginTop={2} marginRight="4px" />
                      <Text>Implement effective company policies to ensure that all practices comply with labor and employment regulations</Text>
                    </Flex>
                    <Flex align="start" marginTop="10px" maxWidth="880px">
                      <Box bg="orange" width="8px" height="6px" borderRadius="full" marginTop={2} marginRight="4px" />
                      <Text>Increased employee retention rates by managing workplace satisfaction to an over 90% success rate by 
                      creating and maintaining a positive work environment
                      </Text>
                    </Flex>
                    <Flex align="start" marginTop="10px" maxWidth="880px">
                      <Box bg="orange" width="6px" height="6px" borderRadius="full" marginTop={2} marginRight="4px" />
                      <Text>Develop targeted outreach practices to increase minority recruitment and ensure compliance with affirmative action policies
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              )}
          </VStack>
        </Box>
        {/*Education Schema */}
        <Box marginTop={'4px'}>
          <Flex textColor={color?color:"orange"} marginLeft="10px">
            <Heading size="md">Education</Heading>
            <Box marginLeft="50px" marginTop="10px" height="2px" width="550px" backgroundColor={color?color:"orange"} />
          </Flex>
          <VStack textAlign={'start'}>
            {education
              ? education.map((edu, index) => (
                <Box key={index} padding="8px" marginTop="10px" width={'700px'} marginLeft={'10px'}>
                  <Flex justifyContent="space-between" >
                    <Box>
                      <Heading size="sm" fontFamily={fontStyle}> {edu.school} {edu.location ? ',' + edu.location : ''}</Heading>
                      <Heading size="sm" fontFamily={fontStyle}>{edu.degree ? edu.degree + 'in' : ''}  {edu.fieldOfStudy}</Heading>
                    </Box>
                    <Box>
                      <Text fontFamily={fontStyle} fontSize={'sm'} marginRight={'10px'}>{edu.startDate}  {edu && edu.endDate ? '- ' + edu.endDate : edu.startDate ? "Present" : ''}</Text>
                    </Box>
                  </Flex>
                  <VStack align="start" marginTop="10px" textAlign={'start'} marginLeft={'20px'}>
                    <Text fontSize="md" maxW={'650px'} fontFamily={fontStyle} dangerouslySetInnerHTML={{ __html: edu.description }} />
                  </VStack>
                </Box>
              ))
              : (
                <Box padding="8px" marginTop="10px" marginLeft="10px">
                  <Flex justifyContent="space-between">
                    <Box>
                      <Heading size="sm">University of XYZ, City, State</Heading>
                      <Heading size="sm">Bachelor of Science in Engineering</Heading>
                    </Box>
                    <Text>August 2012 - May 2016</Text>
                  </Flex>
                  <Flex align="start" marginTop="10px">
                    <Box bg="orange" width="8px" height="6px" borderRadius="full" marginTop={2} marginRight="4px" />
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                  </Flex>
                </Box>
              )}
          </VStack>
        </Box>

        {/*Skills section*/ }
        <Box marginTop={'4px'}>
          <Flex textColor={color?color:"orange"} marginLeft="10px" textAlign={'start'}>
            <Heading size="md">Skills</Heading>
            <Box marginLeft="50px" marginTop="10px" height="2px" width="650px" backgroundColor={color?color:"orange"} />
          </Flex>
          <VStack textAlign={'start'}>
            {skills
              ? skills.map((skill, index) => (
                <Flex alignItems={'baseline'} key={index}  width={'720px'} >
                  {/* {skill &&  <Box marginTop={2.5}  marginRight={'2px'} width={'3px'} height={'3px'} borderRadius={'full'} 
                  bgColor={'black'}/> }
                    <Text>{skill}</Text> */}
                  <Text fontSize={'md'} fontFamily={fontStyle}>•  {skill}</Text>
                </Flex>
              ))
              : (
                <Flex padding="8px" marginTop="10px" marginRight="600px" justifyContent={'start'}>
                  <Text>No skills provided</Text>
                </Flex>
              )}
          </VStack>
        </Box>
        {/* Projects Section */}
        <Box marginTop={'4px'} paddingBottom={20} paddingTop={5}>
          <Flex textColor={color?color:"orange"} marginLeft="10px">
            <Heading size="md">Projects</Heading>
            <Box marginLeft="50px" marginTop="10px" height="2px" width="650px" backgroundColor={color?color:"orange"} />
          </Flex>
          <VStack textAlign={'start'}>
            {projects
              ? projects.map((project, index) => (
                <Box key={index} marginTop={'10px'} width={'750px'}>
                  <Heading fontSize="md" fontFamily={fontStyle}>{project.projectName}</Heading>
                  <Text fontSize="md" maxW={'650px'} fontFamily={fontStyle} dangerouslySetInnerHTML={{ __html: project.projectDescription }} />
                </Box>
              ))
              : (
                <Flex padding="8px" marginTop="10px" marginRight="600px" justifyContent={'start'}>
                  <Text>No projects provided</Text>
                </Flex>
              )}
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
}

export default Template1;
