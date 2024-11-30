import { useState } from 'react'
import './App.css'
import { Container } from '@chakra-ui/react';
import {Routes,Route,Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage'

import { useRecoilValue } from 'recoil';
import authScreenAtom from './Atoms/authAtom';
import userAtom from './Atoms/userAtom';
import AuthPage from './pages/AuthPage';
import Details from './pages/Details';
import Headers from './components/Headers';
import ProfessionalDetails from './pages/ProfessionalDetails';
import EducationDetails from './pages/EducationDetails';
import Skills from './pages/Skills';
import Template1 from './templates/Template1'
import ProjectsPage from './pages/ProjectsPage';
import SummaryPage from './pages/SummaryPage';
import Template2 from './templates/Template2';
import SelectTemplate from './pages/SelectTemplate';
import SuccessPage from './pages/SuccessPage';
import UserPage from './pages/UserPage';
import ResumePage from './pages/ResumePage';
import Account from './pages/Account';
import ResetPassword from './pages/ResetPassword';
function App() {
const authScreen=useRecoilValue(authScreenAtom);
const user=useRecoilValue(userAtom)
  return (
    <Container maxWidth="1300px">
      <Headers/>
    <Routes>
      <Route path="/" element={user ? <Homepage/> : <Navigate to="/auth" />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
      <Route path='/:resumeId' element={user ?<ResumePage/>:<Navigate to="/" />} /> 
      <Route path='/editor/details' element={user?<Details/>:<Navigate to="/" />} />
      <Route path='/editor/work-history' element={user?<ProfessionalDetails/>:<Navigate to="/" />} />
      <Route path='/editor/education' element={user?<EducationDetails/>:<Navigate to="/" />} />
      <Route path='/editor/skills' element={user?<Skills/>:<Navigate to="/" />} />
      <Route path='/editor/projects' element={user?<ProjectsPage/>:<Navigate to="/" />}></Route>
      <Route path='/editor/summary' element={user?<SummaryPage/>:<Navigate to="/" />} />
      <Route path='/template1' element={user?<Template1/>:<Navigate to="/" />} />
      <Route path='/template2' element={user?<Template2/>:<Navigate to="/" />} />
      <Route path='/templates' element={user?<SelectTemplate/>:<Navigate to="/" />} />
      <Route path='/success' element={user?<SuccessPage/>:<Navigate to="/" />} />
      <Route path='/dashboard' element={user?<UserPage/>:<Navigate to="/" />} />
      <Route path='/account' element={user?<Account/>:<Navigate to="/" />} />
      <Route path='/reset' element={<ResetPassword/>} />
    </Routes>
  </Container>
  )
}

export default App
