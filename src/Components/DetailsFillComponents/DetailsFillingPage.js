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
      <div className='build-container'>

        <div className="details-container" style={{ maxWidth: "1920px", backgroundColor: "#fafafa", }}>

            <div id='details-form-cont' >
            
              <PersonalInfo></PersonalInfo>
              <WorkEx></WorkEx>
              <Education></Education>
              <KeySkills></KeySkills>

            </div>
         

        </div>

        <div className='preview-container'>
          <div id='divToPrint' >
            {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
            {selectedTemplate === ""
              ? <Template4 />
              : selectedTemplate === "Template 1"
                ? <Template1 />
                : selectedTemplate === "Template 2"
                  ? <Template2 />
                  : selectedTemplate === "Template 4"
                    ? <Template4 />
                    
                    : <Template3 />}
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
