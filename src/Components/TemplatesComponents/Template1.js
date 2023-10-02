import React from 'react'
import { useSelector } from 'react-redux'
import parser from 'html-react-parser'


const shortid = require('shortid')

function Template2() {
    const dataStore = useSelector(state => state.dataStore)
    return (
        <div className='template-global' style={{ fontFamily: 'Rubik', fontWeight: '400' }}>
            <div className=' w-100 position-relative' style={{ height: '15%', overflow:'hidden', background:'white'}}>
                <img className="position-absolute" src={dataStore.imageFile} alt=''
                    style={{ display:'flex', alignItems:'center', width: '100%',height:'auto', padding: 0, zIndex: '5', opacity: '0.7', translate:'0 -200px' }} />
                <div className='d-flex justify-content-between align-items-center gap-3 w-100' style={{padding:'2.8rem'}} >
                    <div className=' d-flex flex-column ps-4' style={{ textTransform: 'uppercase', fontWeight: '500', fontSize: '30px', zIndex: '6'}}>
                        <div style={{ textTransform: 'uppercase', fontWeight: '500', fontSize: '30px', lineHeight:'30px'}}>{dataStore.personalInfo.firstName}</div>
                        <div style={{ textTransform: 'uppercase', fontWeight: '500', fontSize: '30px', lineHeight:'30px'}}>{dataStore.personalInfo.lastName}</div>
                        <div style={{  fontWeight: '400', fontSize: '14px', }}>{dataStore.personalInfo.Role}</div>
                    </div>
                    <div style={{ zIndex: '6'}}>
                        <div style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all' }}>{dataStore.personalInfo.City}</div>
                        <div style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all' }}>{dataStore.personalInfo.Mobile}</div>
                        <div style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all' }}>{dataStore.personalInfo.Email}</div>
                        <div className="text-left d-flex flex-column gap-0" style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all' }}>
                            {dataStore.links[0].socialLink}
                        </div>

                    </div>
                </div>

            </div>


            <div className='template-g-bg top-0' style={{ background: '', padding: '3rem' }}>
                <div className='d-grid gap-3 mb-4' style={{ gridTemplateColumns: '75% 22%' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '500' }}>BIOGRAPHY</h3>
                        <div className="d-flex" style={{ fontSize: "14px", color: 'grey' }}>{parser(dataStore.personalInfo.Objective)}</div>
                    </div>
                    <div className="d-flex flex-column gap-0" style={{ fontWeight: '400', fontSize: "12px", wordBreak: 'break-all', textAlign:'right'}}>
                        {dataStore.links.slice(1).map((link) => {
                            return (
                                <div key={shortid.generate()}>{link.socialLink}</div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className='d-flex gap-3 mb-4' style={{}}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '500' }}>EXPERIENCE</h3>
                        <div className="justify-content-left d-flex flex-column" style={{ fontSize: "14px", color: 'grey' }}>
                            {dataStore.workEx.map((item) => {
                                return (
                                    <div className='position-relative mb-2' key={shortid.generate()}>
                                        <div className=''><h4 className='h6 m-0' style={{ fontWeight: "500", fontSize: '13px', textTransform: 'uppercase', color: 'black' }}>{'• ' + item.title}</h4></div>
                                        <div className=''><h4 className='mt-1' style={{ fontSize: "13px", paddingLeft: '8px' }}>{item.orgName + ' | ' + item.startYear + ' - ' + item.endYear}</h4></div>

                                        <div className='m-0'>
                                            <div className='tiptap-text-p' style={{ fontSize: "14px", color: 'grey', fontWeight: '400', paddingLeft: '8px' }}>
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
                <div className='d-flex gap-3 mb-4' style={{}}>
                    <div className='w-100'>

                        <h3 style={{ fontSize: '16px', fontWeight: '500' }}>EDUCATION</h3>
                        <div className='justify-content-left d-flex flex-column ' style={{ fontSize: "14px" }}>
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
                    </div>
                </div>
                <div className='d-flex gap-1 flex-column'>
                            <h6 style={{ fontSize: '16px', fontWeight: '500' }}>SKILLS</h6>
                            <div className="d-flex flex-row gap-3 flex-wrap">
                                {dataStore.skills.map((skill) => {
                                    return (
                                        <div key={shortid.generate()} style={{ fontWeight: '400', fontSize: "14px", color:'gray' }}>{skill.skillName}</div>
                                    )
                                })
                                }
                            </div>
                        </div>


            </div>
        </div>


    )
}

export default Template2
