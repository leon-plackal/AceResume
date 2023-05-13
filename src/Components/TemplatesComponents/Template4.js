import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template4() {
    const dataStore = useSelector(state => state.dataStore)
  return (
    <div className='template-global'>
        <div className='template-g-bg'>

            <div className='d-flex justify-content-center'>
                <div className='' style={{color:"black",fontSize:"25px"}}>{ dataStore.personalInfo.firstName +" "+  dataStore.personalInfo.lastName}</div>
                <hr/>
            </div>
            <div className='d-flex gap-3 justify-content-center h6 fw-light' >
                <div className="" style={{backgroundColor:'white', color:"black"}}></div>
                <div className=''>{dataStore.personalInfo.City+" - "+ dataStore.personalInfo.State +" - "+ dataStore.personalInfo.Pin}
                        </div>
                <div style={{color:'black'}}>{dataStore.personalInfo.Mobile}</div>
                <div style={{color:'black'}}>{dataStore.personalInfo.Email}</div>
            </div>
            <div>
                <hr style={{height:"1px",backgroundColor:"#4b6982"}}/> 
                <div className=" justify-content-left d-flex text-lg-center" style={{fontSize:"17px",}}>{dataStore.personalInfo.Objective}</div>
            </div>
              
            <div className='experience'>
                <div className="">
                <div className='d-flex justify-content-center'> 
                    <h3 className='h4 mt-4'>Professional Experience</h3>
                </div>
                <hr style={{height:"1px",backgroundColor:"#4b6982"}}/> 

                <div className="text-left " style={{fontSize:"18px"}}>
                    {dataStore.workEx.map((item)=>{
                        return(
                                <div className='position-relative' key={shortid.generate()}>
                                    <div className=''><h4 className='h6 m-0'>{item.orgName}</h4></div>
                                    <div className=''><b>{item.title}</b></div>
                                    
                                    <div className=''>
                                        <div className='position-absolute top-0 end-0'>{item.startYear} - {item.endYear}</div>
                                        <ul className='mb-4'>
                                        <li style={{fontSize:"16px"}}>{item.jobDescription}</li>
                                        </ul>
                                        
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
                        <h3 className='h4 mt-4'>Education</h3>
                    </div>
                    <hr style={{height:"1px",backgroundColor:"#4b6982"}}/> 
                    <div className=" text-left" >
                        
                        <div style={{fontSize:"18px"}}>
                            {dataStore.education.map((item)=>{
                                return(
                                        <div className='position-relative' key={shortid.generate()}>
                                            <div className='h6 m-0'>{item.University}</div>
                                            <div className=''><b>{item.Degree}</b></div>
                                            
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
                        <h3 className='h4 mt-4'>Skills&Other</h3>
                    </div>
                    <hr style={{height:"1px",backgroundColor:"#4b6982"}}/>
                    <div className=" text-left d-flex flex-lg-row gap-2" style={{fontSize:"18px"}}>
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
