import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom';
import BuildPage from './Components/BuildComponents/BuildPage';
import Home from './Components/HomePage/Home'
import Footer from '../src/Components/Navigation/Footer'
import MyResume from './Components/ResumeDisplay/MyResume';
import AboutUs from './Components/Navigation/TemplateSelect';
import LoginPage from './Components/HomePage/LoginPage';
import './App.css';

function App() {
  return (
    <div>   
        <div>
            <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route path="/build" element ={<BuildPage />}></Route> 
                  <Route path="/preview" element={<MyResume/>}></Route>
                  <Route path="/login" element={<LoginPage/>}></Route>
                  <Route exact path="/about" element={<AboutUs/>}></Route>
                  <Route path="*" element={<Navigate to="/about" />}></Route>
            </Routes> 
        </div>
        <Footer/>
    </div>
  )
}

export default App


