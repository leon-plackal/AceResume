import React from 'react'
import parser from 'html-react-parser'
import { useSelector } from 'react-redux'

const shortid = require('shortid')

function Template4() {
    const dataStore = useSelector(state => state.dataStore)
  return (
    <div className='template-global'>
        <div className='template-g-bg'>

            <div className='d-flex justify-content-center'>
                <div className='' style={{color:"black",fontSize:"25px"}}>{ dataStore.personalInfo.firstName +" "+  dataStore.personalInfo.lastName}</div>
                
            </div>
            <div className='d-flex gap-3 justify-content-center h6 fw-light' >
                <div className="" style={{color:"black"}}></div>
                <div className=''>{dataStore.personalInfo.Role+" - "+ dataStore.personalInfo.City +" - "+  dataStore.personalInfo.Mobile+" - "+dataStore.personalInfo.Email}
                        </div>
            </div>
            <div>
                <hr style={{height:"2px",backgroundColor:"#4b6982", margin:'5px'}}/> 
                <div className=" justify-content-left d-flex text-lg-center" style={{fontSize:"17px",}}>{parser(dataStore.personalInfo.Objective)}</div>
            </div>
              
            {/* work experience */}
            <div className='experience'>
                <div className="">
                <div className='d-flex justify-content-center'> 
                    <h3 className='h4 mt-1'>Professional Experience</h3>
                </div>
                <hr style={{height:"2px",backgroundColor:"#4b6982",  margin:'5px'}}/> 

                <div className="text-left " style={{fontSize:"18px"}}>
                    {dataStore.workEx.map((item)=>{
                        return(
                                <div className='position-relative' key={shortid.generate()}>
                                    <div className=''><h4 className='h6 m-0'>{item.orgName}</h4></div>
                                    <div className=''><b>{item.title}</b></div>
                                    
                                    <div className=' m-0'>
                                        <div className='position-absolute top-0 end-0'>{item.startYear} - {item.endYear}</div>
                                        <div className='tiptap-text-p'>
                                        {parser(item.jobDescription)}
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
                </div>

                {/* Education */}
                <div id='education'>
                    <div className='d-flex justify-content-center'> 
                        <h3 className='h4 mt-1'>Education</h3>
                    </div>
                    <hr style={{height:"2px",backgroundColor:"#4b6982",  margin:'5px'}}/> 
                    <div className=" text-left" >
                        
                        <div style={{fontSize:"18px"}}>
                            {dataStore.education.map((item)=>{
                                return(
                                        <div className='position-relative' key={shortid.generate()}>
                                            <div className='h6 m-0'>{item.University}</div>
                                            <div className=''><b>{item.Degree}</b></div>
                                            <div className='' style={{fontSize:'12px'}}>{parser(item.Type)}</div>
                                            
                                            <div className='position-absolute top-0 end-0'>{item.Start} - {item.End}</div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div id='skills'>
                    <div className='d-flex justify-content-center'> 
                        <h3 className='h4 mt-1'>Skills</h3>
                    </div>
                    <hr style={{height:"2px",backgroundColor:"#4b6982",  margin:'5px'}}/>
                    <div className="d-flex flex-row gap-2" style={{fontSize:"14px"}}>
                            {dataStore.skills.map((skill)=>{
                                return(
                                        <div key={shortid.generate()}>{skill.skillName}</div>
                                    )
                                })
                            }
                    </div>
                </div>
                    
           
        </div>
      
    </div>
  )
}

export default Template4
