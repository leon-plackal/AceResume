import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePicUploadComponent from './ProfileUpload'
import TextField from '../InputComponents/TextField'
import { updatePersonalInfo, updateErrorMessages, updateLinks, addArrayElement, removeArrayElement } from '../../ReduxManager/dataStoreSlice'
import GTPPersonalPopup from '../GPT/objectiveModal'
import TipTapPersonal from '../InputComponents/TiptapPersonal'
import { AiOutlineInfoCircle } from 'react-icons/ai'
//this component renders Personal Info page inside the details filling page.
function PersonalInfo(props) {
  const personalHeads = useSelector(state => state.dataStore.personalInfo) //this state is used to store personalInfo object of dataStoreSlice.
  const linkHeads = useSelector(state => state.dataStore.links) // this state stores the skills of dataStoreSlice.
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false)

  const onChangeHandler = (key, value, errorMessage = undefined) => {
    //this function is called each time when the user provides input to the targeted'TextField'
    dispatch(updatePersonalInfo({
      //this function updates the targeted key of the personalInfo element of dataStore in dataStoreSlice.js //
      key: key,
      value: value
    }))
    if (errorMessage !== undefined) {
      dispatch(updateErrorMessages({
        // this function is called each time when there is a validatin check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
        key: key,
        value: errorMessage
      }))
    }
  }

  function AddLink() {
    //this function is used to push a blank object {skillName:"",} in the skills element of dataStoreSlice,
    //when the user clicks on the Add-Skill button to add more related details//
    dispatch(addArrayElement({
      key: 'links',
      element: { socialLink: "", }
    })
    )
  }
  function RemoveLink() {
    //this function deletes the latest saved details in the skills element, when the user clicks on the remove button.
    if (linkHeads.length > 1) {
      dispatch(removeArrayElement({ key: "links" }))
    }
  }

  const showTip = async() => {
    const infoBox = document.getElementById("objective-infotext");
    if (showInfo) {
      infoBox.style.visibility = 'hidden'
    } else {
      infoBox.style.visibility = 'visible'
    }
    setShowInfo(!showInfo)
  }
  return (
    <div className='section-container' style={{ padding: "4rem", textAlign: "left", }}>
      <h2>Personal Details</h2>
      <hr />
      <div>
        <div>
          {/* ProfilePicUploadComponent is to show the selected profileImage in the resume uploaded by the user*/}
          <ProfilePicUploadComponent />
        </div>
        <div className="input-row-cont" >
          <div className="input-container">
            <div className=''>
              <label htmlFor="firstname" className="label">First Name*</label>
            </div>
            <div className=''>
              {/* TextField basically serves the purpose of validating the details filled by the user by calling updateErrorMessages function and also updates the value of targeted key by using onChange function */}
              <TextField type="text" elementId="firstname" placeholder="First name"
                value={personalHeads.firstName}
                onChange={
                  // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                  //the user given input will be send as value alongwith errorMessage , if there is any .
                  (value, errorMessage) => {
                    //this function calls back onChangeHandler which will update targeted key of 'PersonalInfo' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                    onChangeHandler('firstName', value, errorMessage)
                  }
                }
                validation={{
                  //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                  required: true,
                }}
              />
            </div>

          </div>

          <div className="input-container">

            <div className=''>
              <label htmlFor="lastname" className="label">Last Name</label>
            </div>
            <div className=''>
              <TextField type="text" elementId="lastname" placeholder="Last name"
                value={personalHeads.lastName}
                onChange={(value) => { onChangeHandler('lastName', value) }}
              />
            </div>
          </div>

        </div>
        <div className="input-row-cont" >
          <div className="input-container">

            <div className=''>
              <label htmlFor="staticEmail" className="label">Email*</label>
            </div>
            <div className="">
              <TextField type="text" elementId="staticEmail" placeholder='users@example.com'
                validation={
                  { checkType: 'email', required: true }
                }
                value={personalHeads.Email}
                onChange={(value, errorMessage) => { onChangeHandler('Email', value, errorMessage) }}
              />
            </div>
          </div>

          <div className="input-container">
            <div className=''>
              <label htmlFor="mobile" className="label">Mobile No.*</label>
            </div>
            <div className="">
              <TextField type="number" elementId="Mobile"
                validation={
                  {
                    maxLengthRequired: 10,
                    required: true,
                  }
                }
                value={personalHeads.Mobile}
                onChange={(value, errorMessage) => { onChangeHandler('Mobile', value, errorMessage) }}
              />
            </div>
          </div>
        </div>

        <div className="input-row-cont" >
          <div className="input-container">
            <div className=''>
              <label htmlFor="inputRole" className="label">Role</label>
            </div>
            <div className=''>
              <TextField type="text" elementId="inputRole"
                value={personalHeads.Role}
                onChange={(value) => { onChangeHandler('Role', value) }}
              />
            </div>
          </div>
          <div className="input-container">

            <label htmlFor="inputCity" className="label">City</label>

            <div className="">
              <TextField type="text" elementId="inputCity"
                validation={
                  { required: false, }
                }
                value={personalHeads.City}
                onChange={(value, errorMessage) => { onChangeHandler('City', value, errorMessage) }}
              />
            </div>
          </div>
        </div>
        <label htmlFor="inputLink" className="label">Links</label>
        {linkHeads.map((item, index) => {
          return (
            <div key={index} className=''>
              <div className='input-row-cont dflex links-cont' style={{ justifyContent: 'left', alignItems: 'center', gap: '1rem' }}>
                <div className='input-container' >

                  <TextField type="text" value={item.socialLink}
                    onChange={(value) => {
                      dispatch(updateLinks({
                        key: 'socialLink',
                        value: value,
                        index: index,
                      }))
                    }}
                  />
                </div>
                <div className='links-btn'>
                <button className='d-flex p-0' style={{ height: '25px', width: '25px', justifyContent: 'center', alignItems: 'center' }}
                  onClick={AddLink}>
                  +
                </button>
                <button className='d-flex p-0' style={{ height: '25px', width: '25px', justifyContent: 'center', alignItems: 'center' }}
                  onClick={RemoveLink}>
                  -
                </button>
                </div>
              </div>
            </div>

          )
        })}
        <div className='add-remove-container'>
          <div className=''>

          </div>
          <div className=''>

          </div>
        </div>
        <div className=" input-row-cont mt-5">
          <div className="input-container-text">
            <div className='label-container'>
              <label htmlFor="Textarea" className="label">Objective</label>
            </div>
            <div className='text-area-container'>
              <div className='animate-overflow pers-gtp'></div>
              <div className='position-relative tiptap-editor'>
                <TipTapPersonal
                />
              </div>

              <div className='gtp-btn-container'>
                <h6>Need Help?</h6>
                <GTPPersonalPopup />
              </div>
              <button className='info-btn' onClick={showTip}>
                <AiOutlineInfoCircle />
              </button>

            </div>
          </div>
        </div>
      </div>
      <div id='objective-infotext'>
        A good resume summary section should be concise and highlight your most relevant skills, experience, and accomplishments. It should also include a few key words that are related to the job you are applying for. Additionally, it should be tailored to the specific job you are applying for and demonstrate why you are the best candidate for the position.
      </div>
    </div>
  )
}

export default PersonalInfo
