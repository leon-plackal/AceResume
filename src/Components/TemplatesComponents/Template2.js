import React from 'react'
import { useSelector } from 'react-redux'
import parser from 'html-react-parser'


const shortid = require('shortid')

function Template2() {
    const dataStore = useSelector(state => state.dataStore)
    return (
        <div className='template-global' style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
            <div className='template-g-bg' style={{ background: '', padding: '2.5rem' }}>

                <div className='d-grid gap-3 mb-2 h-100' style={{ gridTemplateColumns: '20% 80%' }}>
                    <div className='left d-flex align-content-center flex-column gap-3 position-relative h-100'>
                        <div className="" style={{}}>
                            <img className="mx-auto mt-2" src={dataStore.imageFile} alt=''
                                style={{ height: "100px", width: '100px', padding: 0, objectFit: 'cover', borderRadius: '5px' }} />
                        </div>
                        <div className='d-flex gap-1 flex-column'>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>Details</h6>
                            <div style={{ color: 'black', fontSize: '12px' }}><h6>Phone:</h6>{dataStore.personalInfo.Mobile}</div>
                            <div style={{ color: 'black', fontSize: '12px' }}><h6>Email:</h6>{dataStore.personalInfo.Email}</div>
                        </div>
                        <div className='d-flex gap-1 flex-column'>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>Links:</h6>
                            <div className="text-left d-flex flex-column gap-0" style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all' }}>
                                {dataStore.links.map((link) => {
                                    return (
                                        <div key={shortid.generate()}>{link.socialLink}</div>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className='d-flex gap-1 flex-column bottom-0 position-absolute'>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>Skills</h6>
                            <div className="text-left d-flex flex-column gap-0" style={{ fontWeight: '400', fontSize: "16px" }}>
                                {dataStore.skills.map((skill) => {
                                    return (
                                        <div key={shortid.generate()}>{skill.skillName}</div>
                                    )
                                })
                                }
                            </div>
                        </div>

                    </div>
                    <div className='right d-flex align-content-center bi-justify-left flex-column gap-2'>
                        <div className='d-flex gap-1 flex-column' style={{ color: "black", fontSize: "25px", fontWeight: '500' }}>
                            <div>{dataStore.personalInfo.firstName + " " + dataStore.personalInfo.lastName}</div>
                            <div style={{ fontSize: '16px', color: 'grey', fontWeight: '400' }}>{dataStore.personalInfo.Role}</div>
                            <hr style={{ height: "2px", backgroundColor: "#4b6982", marginBottom: '6px' }} />
                        </div>
                        <div>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>About me</h6>
                            <div className="justify-content-left d-flex" style={{ fontSize: "14px", color: 'grey' }}>{parser(dataStore.personalInfo.Objective)}</div>
                            <hr style={{ height: "2px", backgroundColor: "#4b6982" }} />
                        </div>
                        <div>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>Experience</h6>
                            <div className="text-left " style={{ fontSize: "18px" }}>
                                {dataStore.workEx.map((item) => {
                                    return (
                                        <div className='position-relative' key={shortid.generate()}>
                                            <div className=''><h4 className='h6 m-0' style={{ fontWeight: "500", fontSize: '15px' }}>{item.title}</h4></div>
                                            <div className=''><h4 className='mt-1' style={{ fontSize: "13px" }}>{item.orgName}</h4></div>

                                            <div className=' m-0'>
                                                <div className='position-absolute top-0 end-0' style={{ fontSize: "12px", color: 'gray' }}>{item.startYear} - {item.endYear}</div>
                                                <div className='tiptap-text-p' style={{ fontSize: "14px", color: 'grey', fontWeight: '400' }}>
                                                    {parser(item.jobDescription)}
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <hr style={{ height: "2px", backgroundColor: "#4b6982", marginBottom: '6px' }} />
                        </div>
                        <div>
                            <h6 style={{ fontSize: '16px', color: '#168bbd' }}>Education</h6>
                            <div style={{ fontSize: "16px" }}>
                                {dataStore.education.map((item) => {
                                    return (
                                        <div className='position-relative' key={shortid.generate()}>
                                            <div className='mb-2' style={{ fontWeight: '500', }}>{item.Degree + ' at ' + item.University}</div>
                                            <div className='position-absolute top-0 end-0' style={{ fontSize: "12px", color: 'gray' }}>{item.Start} - {item.End}</div>
                                            <div className='' style={{ fontWeight: '400', color: 'gray' }}>{parser(item.Type)}</div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <hr style={{ height: "2px", backgroundColor: "#4b6982", marginBottom: '6px' }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Template2
