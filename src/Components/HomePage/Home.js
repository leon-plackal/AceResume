import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Navigation/Navbar'

//this Home component is rendering various resume templates on to the screen and the user can select either of them and proceed further. 
function Home() {

    return (
        <div className='background-2'>
            <div><NavBar></NavBar></div>
            <section id='home-header'>
                        <div className=''>
                            <h1>Free online resume builder</h1>
                        </div>
                        <div className='div-features-list'>
                            <ul className='features-list'>
                                <li>
                                    Easy to create
                                </li>
                                <li>
                                    Export to PDF
                                </li>
                                <li>
                                    Choose from Templates
                                </li>
                                <li>
                                    AI Assisted Answers
                                </li>
                            </ul>
                        </div>
                        <Link to='/build'>
                        <button className='create-button'>
                            Create My Resume
                        </button>
                        </Link>
                    </section>

                <div className='home-container'>
                    <section id='home-features'>
                        <div>
                            <p>
                                AceResume uses the power of Open AI's Chat GPT and simple yet stylistic templates to help make the resume and cover letter building process hassle free. Get high quality answers from Chat GPT, tailored to your job and experience - never run into a blank again when writing! The builder features many free templates and the ability to export your finished product to PDF.
                                Stand out from other condidates by using our tool to help your resume building process.
                            </p>
                            <ul>
                                <li>Get AI assisted answers to eliminate the mundane writing process</li>
                                <li>Export your resume PDF format</li>
                                <li>Easy and quick editing</li>
                                <li>Live preview of your resume as you edit</li>
                                <li>Stylish templates</li>
                                <li>Some templates are based on previous users success in the field</li>
                            </ul>
                        </div>
                    </section>
                    <section id='home-gallery'>
                        {/* <img className='home-img' src={img2}/> */}
                    </section>
                </div>
            
        </div>
    )
}

export default Home
