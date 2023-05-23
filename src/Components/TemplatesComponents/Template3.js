import React from 'react'
import parser from 'html-react-parser'
import { useSelector } from 'react-redux'

const shortid = require('shortid')

function Template4() {
    const dataStore = useSelector(state => state.dataStore)
    return (
        <div className='template-global' style={{ fontFamily: 'Rubik', fontWeight: '400' }}>
            <div className='template-g-bg d-grid g-2' style={{ background: 'linear-gradient(13deg, rgba(230,245,234,1) 0%, rgba(250,250,250,1) 62%, rgba(203,214,255,1) 100%)', padding:'2.5rem' }}>

                <div className='right'>
                    <div className='d-grid gap-3 mb-2' style={{ gridTemplateColumns: '20% 80%' }}>
                        <h6>Details</h6>
                        <div className='d-flex flex-row gap-3'>
                            <div style={{ color: 'black', fontSize: '12px' }}>{dataStore.personalInfo.Mobile}</div>
                            <div style={{ color: 'black', fontSize: '12px' }}>{dataStore.personalInfo.Email}</div>
                        </div>

                    </div>

                    <div className='d-grid gap-3 mb-4' style={{ gridTemplateColumns: '20% 80%' }}>
                        <div></div>
                        <div>
                            <div className='' style={{ color: "black", fontSize: "25px", fontWeight: '500' }}>{dataStore.personalInfo.firstName + " " + dataStore.personalInfo.lastName + ", " + dataStore.personalInfo.Role}</div>
                            <div className="" style={{ textAlign: 'left', fontWeight: '500' }}>{parser(dataStore.personalInfo.Objective)}</div>
                        </div>
                    </div>

                    <div className='d-grid gap-3 mb-2' style={{ gridTemplateColumns: '20% 80%' }}>
                        <h6>Employment</h6>
                        <div className="text-left " style={{ fontSize: "18px" }}>
                            {dataStore.workEx.map((item) => {
                                return (
                                    <div className='position-relative' key={shortid.generate()}>
                                        <div className='' style={{ fontWeight: '500' }}>{item.title + " at " + item.orgName}</div>
                                        <div className='m-0' style={{ fontSize: "12px", color: 'gray' }}>
                                            <div className=''>{item.startYear} - {item.endYear}</div>
                                        </div>
                                        <div className=''>
                                            <div className='tiptap-text-p' style={{ fontWeight: '400' }}>
                                                {parser(item.jobDescription)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>

                    <div className='d-grid gap-3 mb-4' style={{ gridTemplateColumns: '20% 80%' }}>
                        <div><h6 >Education</h6></div>
                        <div style={{ fontSize: "18px" }}>
                            {dataStore.education.map((item) => {
                                return (
                                    <div className='position-relative' key={shortid.generate()}>
                                        <div className='' style={{ fontWeight: '500' }}>{item.Degree + ' at ' + item.University}</div>
                                        <div className='m-0' style={{ fontSize: "12px", color: 'gray' }}>{item.Start} - {item.End}</div>
                                        <div className='' style={{ fontWeight: '400' }}>{parser(item.Type)}</div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>

                    <div className='d-grid gap-3 mb-4' style={{ gridTemplateColumns: '20% 80%' }}>
                    <div><h6>Skills</h6></div>
                    <div className="text-left d-flex flex-row gap-2" style={{fontWeight: '400',fontSize: "14px", flexWrap:'wrap' }}>
                        {dataStore.skills.map((skill) => {
                            return (
                                <div key={shortid.generate()}>{skill.skillName}</div>
                            )
                        })
                        }
                    </div>
                </div>

                </div>



                


            </div>

        </div>
    )
}

export default Template4
