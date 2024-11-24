import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardSection from './Pages/CardPages/CardSection'
import AboutSection from './Pages/AboutPages/AboutSection'
import WorksSection from './Pages/WorksPages/WorksSection'
import ContactsSection from './Pages/ContactsPage/ContactsSection'
import AdminImg from "./Pages/AdminPages/AdminImg";
import Login from "./Pages/LoginPages/Login/Login";
import Register from "./Pages/LoginPages/Register/register";
import AdminDb from "./Pages/AdminPages/AdminDb";
import '../public/CSS/style.css'
import '../public/CSS/mediaquery.css'
import '../public/CSS/animations.css'
import '../public/CSS/admin.css'
import '../src/Pages/LoginPages/styles.css'

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
