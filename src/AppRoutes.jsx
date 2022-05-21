import {Route, Routes, Navigate} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
export default function AppRoutes(){
  return(
    <Routes>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/" element={<HomePage/>}/>
    </Routes>
  )
}