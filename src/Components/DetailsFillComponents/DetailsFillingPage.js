import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from './PersonalInfo'
import WorkEx from './WorkEx'
import Education from './Education'
import KeySkills from './KeySkills'
import { updateState } from '../../ReduxManager/dataStoreSlice'
import BuildNavBar from '../Navigation/BuildNavbar'
import { useState } from 'react'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import html2canvas from 'html2canvas'


function DetailsFillingPage(props) {
  const dispatch = useDispatch()
  //errorMessages variable store all the error messages passed from TextField while checking the validation of details filled by the user//
  const errorMessages = useSelector(state => state.dataStore.errorMessages)

  let isFormValid = true
  //this 'for loop' checks whether there is any error Message in the errorMessages or not and if it finds any ,it will return the value of 'isFormValid' as 'false' otherwise it will not show any warning message.//
  for (let key in errorMessages) {
    if (errorMessages[key] !== "") {
      isFormValid = false
      break
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
        var ratio = canvas.width / canvas.height;
        var width = pdf.internal.pageSize.getWidth();
        var height = width / ratio;
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save("resume.pdf");
      })
      .then(() => {
        setTimeout(
          // this function shows the modal popup named 'SuccessMessage' after the resume has been successfully downloaded and make it to disappear on its own after 6000 ms//
          () => {
            setShowModal(true)
            setTimeout(
              () => {
                setShowModal(false)
              }
              , 6000)
          }
          , 100)
      })
      ;
  }

  const onSideNavLinkClick = () => {
    //this function stops the users from navigating to different page by accessing sideNavbar if they hadn't filled the details of existing page correctly//
    //if 'isFormValid' is true i.e when there is no messages in the 'errorMessages' then user can navigate to other page ,otherwise it will show alert and warningMessages on the screen// 
    if (!isFormValid) {
      alert('Please fill all the necessary details correctly!') //this alert is shown on the window when the 'isFormValid' is false.
      dispatch(updateState({    //this dispatch functions update the value of 'showErrorMessages' as true, which will be used by 'TextField' component to display warning Message beneath each of the 'TextField' where some kind of validation is required.
        key: 'showErrorMessages',
        value: true
      }))
    }
    else if (isFormValid) {
      dispatch(updateState({
        key: 'showErrorMessages',
        value: false
      }))
    }
  }

  return (
    <div>
      <div>
        <BuildNavBar></BuildNavBar>
      </div>
      {/* <div className="sidebar"  >
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/personalinfo" : '#'} className='no-text-decoration'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z" />
                  </svg>
                </Link>
              </li>
              <li className=" list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/workex" : '#'} className='no-text-decoration' style={{ fontSize: 'inherit' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </Link>
              </li>
              <li className=" list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/education" : '#'} className='no-text-decoration'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                  </svg>
                </Link>
              </li>
              <li className=" list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/keyskills" : '#'} className='no-text-decoration'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
                  </svg>
                </Link>
              </li>

            </div> */}
      <div className='build-container'>

        <div className="details-container" style={{ maxWidth: "1920px", backgroundColor: "#fafafa", }}>

            <div id='details-form-cont' >
            
              <PersonalInfo></PersonalInfo>
              <Education></Education>
              <WorkEx></WorkEx>
              <KeySkills></KeySkills>

            </div>
         

        </div>

        <div className='preview-container'>
          <div id='divToPrint' >
            {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
            {selectedTemplate === ""
              ? <div><Template4 /></div>
              : selectedTemplate === "Template 1"
                ? <Template1 />
                : selectedTemplate === "Template 2"
                  ? <Template2 />
                  : selectedTemplate === "Template 3"
                    ? <Template3 />
                    : <Template4 />}
          </div>

          <div className='preview-header'>
            <div className='w-100 d-flex justify-content-center mt-4'>
              <button className='btn btn-success ms-3 p-2' onClick={downloadComponentPDF}>
                Save Resume
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default DetailsFillingPage
