import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardSection from './Pages/CardSection'
import AboutSection from './Pages/AboutSection'
import WorksSection from './Pages/WorksSection'
import ContactsSection from './Pages/ContactsSection'
import AdminImg from "./Pages/AdminImg";
import '../public/CSS/style.css'
import '../public/CSS/mediaquery.css'
import '../public/CSS/animations.css'
import '../public/CSS/admin.css'
import Login from "./Pages/LoginPages/Login/Login";
import Register from "./Pages/LoginPages/Register/register";
import AdminDb from "./Pages/AdminDb";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CardSection />} />
          <Route path="/AboutSection" element={<AboutSection />} />
          <Route path="/WorksSection" element={<WorksSection />} />
          <Route path="/ContactsSection" element={<ContactsSection />} />
          <Route path="/AdminImg" element={<AdminImg/>}/>
          <Route path="/AdminDb" element={<AdminDb/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
