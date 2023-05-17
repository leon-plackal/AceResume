import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {templateImagesPaths} from '../Data/Data'//templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch } from 'react-redux'
import {updateState} from '../../ReduxManager/dataStoreSlice'
import NavBar from '../Navigation/Navbar'
//this Home component is rendering various resume templates on to the screen and the user can select either of them and proceed further. 
function Home() {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')//this state is used to display 'useTemplate' button when user hovers over the template
    
    const dispatch = useDispatch();
    return (
        <div>
        <div><NavBar></NavBar></div>
        
        <div className='home-container'>
            <section id='home-header'>
            <div>
                <h1>Ace Resume</h1>
                <p>Free online open source resume builder</p>
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
                        Choose from templates
                    </li>
                    <li>
                        Fit for amoongus
                    </li>
                </ul>
            </div>
            <button className='create-button'>
                    Create My Resume
            </button>
            </section>


            <section id='home-features'>
                <div>
                    <p>
                    Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this app, you can create multiple resumes, share them with recruiters or friends through a unique link and print it as a PDF, all for free, no ads, no tracking, without losing the integrity and privacy of your data.
                    </p>
                    <ul>
                        <li>No User Tracking</li>
                        <li>Export your resume to JSON or PDF format</li>

                    </ul>
                </div>
            </section>
        </div>
        </div>
    )
}

export default Home
