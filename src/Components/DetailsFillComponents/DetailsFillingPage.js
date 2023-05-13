import React from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from './PersonalInfo'
import WorkEx from './WorkEx'
import Education from './Education'
import KeySkills from './KeySkills'
import { updateState } from '../../ReduxManager/dataStoreSlice' 
import BuildNavBar from '../Navigation/BuildNavbar'

import ProfilePicUploadComponent from './ProfileUpload'
import {stateNames} from '../Data/Data'
import TextField from '../InputComponents/TextField'
import TextArea from '../InputComponents/TextArea'
import BottomNavigation from './BottomNavigation'
import { updatePersonalInfo, updateErrorMessages } from '../../ReduxManager/dataStoreSlice'

import { useState } from 'react'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import html2canvas from 'html2canvas'
import SuccessMessage from '../ResumeDisplay/Modal'

function DetailsFillingPage(props) {
  const dispatch = useDispatch()
  //errorMessages variable store all the error messages passed from TextField while checking the validation of details filled by the user//
  const errorMessages = useSelector(state=>state.dataStore.errorMessages)

  let isFormValid = true
  //this 'for loop' checks whether there is any error Message in the errorMessages or not and if it finds any ,it will return the value of 'isFormValid' as 'false' otherwise it will not show any warning message.//
  for(let key in errorMessages){
    if(errorMessages[key] !==""){
      isFormValid=false
      break
    }
  }

  const personalHeads= useSelector(state => state.dataStore.personalInfo) //this state is used to store personalInfo object of dataStoreSlice.
  
  const onChangeHandler= (key,value,errorMessage=undefined) =>{
    //this function is called each time when the user provides input to the targeted'TextField'
    dispatch(updatePersonalInfo({
      //this function updates the targeted key of the personalInfo element of dataStore in dataStoreSlice.js //
      key: key,
      value:value
   }))
   if(errorMessage!==undefined){
      dispatch(updateErrorMessages({
        // this function is called each time when there is a validatin check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
        key:key,
        value:errorMessage
      }))
    }
  }

  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
    const [showModal, setShowModal] = useState(false)
    const downloadComponentPDF = () => {
        //this function is called when the user clicks on the 'Save Resume' button.
        // it takes the 'div' element with id 'divToPrint' and then convert it into pdf format which is downloaded into the user's computer memory.
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scrollY: -window.scrollY })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "px", "a4");
            var ratio = canvas.width/canvas.height;
            var width = pdf.internal.pageSize.getWidth();
            var height = width / ratio;
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            pdf.save("resume.pdf");
        })
        .then(()=>{
            setTimeout(
                // this function shows the modal popup named 'SuccessMessage' after the resume has been successfully downloaded and make it to disappear on its own after 6000 ms//
                ()=>{
                    setShowModal(true)
                    setTimeout(
                        ()=>{
                            setShowModal(false)  
                        }
                    ,6000)
                }
            ,100)
        })
    ;
      }

  const onSideNavLinkClick=()=>{
    //this function stops the users from navigating to different page by accessing sideNavbar if they hadn't filled the details of existing page correctly//
    //if 'isFormValid' is true i.e when there is no messages in the 'errorMessages' then user can navigate to other page ,otherwise it will show alert and warningMessages on the screen// 
    if(!isFormValid){
        alert('Please fill all the necessary details correctly!') //this alert is shown on the window when the 'isFormValid' is false.
        dispatch(updateState({    //this dispatch functions update the value of 'showErrorMessages' as true, which will be used by 'TextField' component to display warning Message beneath each of the 'TextField' where some kind of validation is required.
          key:'showErrorMessages',
          value:true
        }))
    }
    else if(isFormValid){
      dispatch(updateState({
        key:'showErrorMessages',
        value:false
      }))
    }
}
  
  return (
    <body>
      <div>
        <BuildNavBar></BuildNavBar>
      </div>
    <div className='build-container'>
      
      <div className="details-container" style={{ maxWidth:"1920px",marginTop:"12px",backgroundColor:"#fafafa",}}>
        
              <div className='row' style={{minHeight:'100vh'}}>

                    <div className=" col-lg-2 col-sm-12 col-12 sidebar"  >
                            <li className="list-item" onClick={onSideNavLinkClick}>
                                <Link to = {isFormValid?"/detailsfillingpage/personalinfo":'#'} className='no-text-decoration'>
                                  Personal Info
                                </Link>
                            </li>
                            <li className=" list-item" onClick={onSideNavLinkClick}>
                                <Link to = {isFormValid?"/detailsfillingpage/workex":'#'} className='no-text-decoration' style={{fontSize:'inherit'}}>
                                Work Experience
                                </Link>
                            </li>
                            <li className=" list-item" onClick={onSideNavLinkClick}>
                                <Link to = {isFormValid?"/detailsfillingpage/education":'#'} className='no-text-decoration'>
                                  Education
                                </Link>
                            </li>
                            <li className=" list-item" onClick={onSideNavLinkClick}>
                                <Link to = {isFormValid?"/detailsfillingpage/keyskills":'#'} className='no-text-decoration'>
                                  Key Skills
                                </Link>
                            </li>

                    </div>
                
                
                    <div id='details-form-cont' className="col-lg-9 col-sm-12 col-12" style={{border:"solid grey 2px", boxShadow: "5px 5px 8px 10px #888888"}}>
                          {/* <Routes>
                                    <Route exact path="/personalinfo" 
                                          element={<PersonalInfo isFormValid={isFormValid} />}>
                                    </Route>
                                     <Route exact path="/workex" 
                                          element={<WorkEx isFormValid={isFormValid}/>}>
                                    </Route>
                                    <Route exact path="/education" 
                                          element={<Education isFormValid={isFormValid}/>}>
                                    </Route>
                                    <Route exact path="/keyskills" 
                                          element={<KeySkills isFormValid={isFormValid}/>}>
                                    </Route>
                          </Routes> */}
                          <PersonalInfo></PersonalInfo>
                          <Education></Education>
                          <WorkEx></WorkEx>
                          <KeySkills></KeySkills>

                    </div>
              </div>
        
      </div>

      <div className='preview-container'>
            <div id='divToPrint' >
                          {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
                          {selectedTemplate===""
                          ?<div><h1>Please select a template!</h1></div>
                          :selectedTemplate === "Template 1"
                          ?<Template1  />
                          :selectedTemplate === "Template 2"
                          ?<Template2  />
                          :selectedTemplate === "Template 3"
                          ?<Template3  />
                          :<Template4  />}
            </div>

            <div className='preview-header'>
              <div className='w-100 d-flex justify-content-center mt-4'>
                  <button className='btn btn-success ms-3 p-2'onClick={downloadComponentPDF}>
                      Save Resume
                  </button>
              </div>
          </div>
      </div>
      
      
    </div>
    </body>
  )
}

export default DetailsFillingPage
