import React from 'react'
import { useSelector } from 'react-redux'
import PersonalInfo from './PersonalInfo'
import WorkEx from './WorkEx'
import Education from './Education'
import KeySkills from './KeySkills'
import BuildNavBar from '../Navigation/BuildNavbar'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'


function BuildPage() {
  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)

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
          <div id='divToShow' >
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
        </div>
      </div>
    </div>
  )
}

export default BuildPage
