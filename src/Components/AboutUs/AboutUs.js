import React from 'react'
import BuildNavBar from '../Navigation/BuildNavbar'
// import {Whatsapp,Facebook,Envelope, Instagram} from 'react-bootstrap-icons'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {templateImagesPaths} from '../Data/Data'//templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch } from 'react-redux'
import {updateState} from '../../ReduxManager/dataStoreSlice'
const shortid= require('shortid')


function AboutUs() {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')//this state is used to display 'useTemplate' button when user hovers over the template
    
    const dispatch = useDispatch();
    return (
    <body>
            <div>
                <BuildNavBar/>
            </div>
        <div className='templates-container '>
            
            <div className='title-message'>
                <h2>Job-winning resume templates</h2>
                <p>Each resume template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates.</p>
                <button className='create-button'>
                    Create My Resume
                </button>
            </div>

            <div className='all-templates'>
                <h2>All Templates</h2>
            </div>

            <div className='templates-grid'>
                <div className='container' style={{color:'#1f4287',}}>
                    <div className='row'>
                        {templateImagesPaths.map((currentTemplate)=>{
                                return(
                                    <div className='col col-lg-3 col-md-6  col-12 mt-5' key={shortid.generate()}>
                                        <div 
                                            style= {{ position:'relative'}}
                                            onMouseOver= {()=>{
                                                //this function allows us to display 'Use Template'button on the top of the targeted template, when the user hovers over it by setting state's value to the targeted template name.//
                                                setIsMouseOver(currentTemplate.name)
                                            }}
                                            onMouseOut= {()=>{
                                                //this function allows us to hide 'Use Template' button when the user moves out from the particular template//
                                                setIsMouseOver('MouseIsNotOver')
                                            }}
                                        >
                                        <div className='w-100 d-flex justify-content-center'><h3>{currentTemplate.name}</h3></div>
                                        <img className="w-100 image-aspect-ratio" src={currentTemplate.imageSource} alt='template'/>
                                        {isMouseOver === currentTemplate.name           //this conditional rendering is showing 'useTemplate' button when isMouseOver === currentTemplate.name //
                                            ?<Link to="/detailsfillingpage/personalinfo">
                                                <button className=''
                                                        style={{position: 'absolute',top:'50%' , right:'30%',}}
                                                        onClick= {()=>{
                                                            dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
                                                            key: 'selectedTemplate',
                                                            value:currentTemplate.name
                                                            }))
                                                        }}
                                                >
                                                Use Template
                                                </button>
                                            </Link>
                                            :null
                                        }
                                    </div>
                                    </div>
                                    
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
        </body>
    )
}

export default AboutUs
