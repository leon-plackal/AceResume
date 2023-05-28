import React from 'react'
import BuildNavBar from '../Navigation/BuildNavbar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { templateImagesPaths } from '../Data/Data'//templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch } from 'react-redux'
import { updateState } from '../../ReduxManager/dataStoreSlice'
const shortid = require('shortid')


function AboutUs() {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')//this state is used to display 'useTemplate' button when user hovers over the template

    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <BuildNavBar />
            </div>
            <div className='templates-container '>

                <div className='title-message'>
                    <h2>What makes a good template?</h2>
                    <p>A good resume template should be easy to read, organized, and include all the necessary information. It should also be visually appealing and tailored to the job you are applying for. The template should also include sections such as a summary of qualifications, work experience, education, skills, and any relevant certifications or awards.</p>
                    <Link to="/build">
                        <button className='create-button' >
                            Create My Resume
                        </button>
                    </Link>
                </div>

                <div>
                    <div className='all-templates'>
                        <h2>All Templates</h2>
                    </div>
                    <hr className='hr-line' />
                    <div className='templates-grid'>

                        {templateImagesPaths.map((currentTemplate) => {
                            return (
                                <div className='template-grid' key={shortid.generate()}>
                                    <div
                                        style={{ position: 'relative' }}
                                        onMouseOver={() => {
                                            //this function allows us to display 'Use Template'button on the top of the targeted template, when the user hovers over it by setting state's value to the targeted template name.//
                                            setIsMouseOver(currentTemplate.name)
                                        }}
                                        onMouseOut={() => {
                                            //this function allows us to hide 'Use Template' button when the user moves out from the particular template//
                                            setIsMouseOver('MouseIsNotOver')
                                        }}
                                    >
                                        <div className='template-title'><h3>{currentTemplate.name}</h3></div>
                                        <img className="template-img" src={currentTemplate.imageSource} alt='template' />
                                        {isMouseOver === currentTemplate.name           //this conditional rendering is showing 'useTemplate' button when isMouseOver === currentTemplate.name //
                                            ? <Link to="/build">
                                                <button className='use-template-btn'
                                                    onClick={() => {
                                                        dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
                                                            key: 'selectedTemplate',
                                                            value: currentTemplate.name
                                                        }))
                                                    }}
                                                >
                                                    Use Template
                                                </button>
                                            </Link>
                                            : null
                                        }
                                    </div>
                                </div>

                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
