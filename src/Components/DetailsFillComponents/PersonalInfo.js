import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ProfilePicUploadComponent from './ProfileUpload'
import TextField from '../InputComponents/TextField'
import TextArea from '../InputComponents/TextArea'
import { updatePersonalInfo, updateErrorMessages } from '../../ReduxManager/dataStoreSlice'
import GTPpopup from '../GPT/modal'

//this component renders Personal Info page inside the details filling page.
function PersonalInfo(props) {
  const personalHeads= useSelector(state => state.dataStore.personalInfo) //this state is used to store personalInfo object of dataStoreSlice.
  const dispatch = useDispatch();
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
  return (
    <div style={{padding:"4rem", textAlign:"left",}}>
      <h2>Personal Details</h2>
      <hr/>
        <div>
          <div>
            {/* ProfilePicUploadComponent is to show the selected profileImage in the resume uploaded by the user*/}
            <ProfilePicUploadComponent/>
          </div>
          <div className="input-row-cont" >
              <div className="input-container">
                <div className='row '>
                  <div className=''>
                    <label htmlFor="firstname" className="label">First Name*</label>
                  </div>
                  <div className=''>
                      {/* TextField basically serves the purpose of validating the details filled by the user by calling updateErrorMessages function and also updates the value of targeted key by using onChange function */}
                      <TextField type="text" elementId="firstname"  placeholder="First name" 
                          value={personalHeads.firstName}
                          onChange={
                            // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                            //the user given input will be send as value alongwith errorMessage , if there is any .
                            (value,errorMessage)=>{
                              //this function calls back onChangeHandler which will update targeted key of 'PersonalInfo' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                              onChangeHandler('firstName',value,errorMessage)
                            }
                          }
                          validation={{
                            //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                            required:true,
                          }}
                      />
                  </div>
                </div>
              </div>

              <div className="input-container">
                  <div className='row'>
                    <div className=''>
                      <label htmlFor="lastname" className="label">Last Name</label>
                    </div>
                    <div className=''>
                      <TextField type="text" elementId="lastname"  placeholder="Last name" 
                            value={personalHeads.lastName}
                            onChange={(value)=>{onChangeHandler('lastName',value)}}
                      />
                    </div>
                  </div>
              </div>
          </div>
          <div className="input-row-cont" >
              <div className="input-container">
                <div className='row '>
                  <div className=''>
                      <label htmlFor="staticEmail" className="label">Email*</label>
                  </div>
                  <div className="">
                      <TextField type="text"  elementId="staticEmail" placeholder='users@example.com' 
                            validation={
                              {checkType:'email' , required:true}
                            }
                            value={personalHeads.Email}
                            onChange={(value,errorMessage)=>{ onChangeHandler('Email',value,errorMessage) }}
                      />
                  </div>
                </div>
              </div>
              <div className="input-container">
                <div className='row '>
                  <div className=''>
                      <label htmlFor="mobile" className="label">Mobile No.*</label>
                  </div>
                  <div className="">
                      <TextField type="number" elementId="Mobile" 
                            validation={
                              { 
                                maxLengthRequired:10 ,
                                required:true,
                              }
                            } 
                            value={personalHeads.Mobile}
                            onChange={(value,errorMessage)=>{ onChangeHandler('Mobile',value,errorMessage) }}
                      />
                  </div>
                </div>
              </div>
          </div>

          <div className="input-row-cont" >
              <div className="input-container">
                <div className='row '>
                  <div className=''>
                      <label htmlFor="inputRole" className="label">Role</label>
                  </div>
                  <div className=''>
                      <TextField type="text" elementId="inputRole" 
                            value={personalHeads.Role}
                            onChange={(value)=>{ onChangeHandler('Role',value) }}
                      />
                  </div>
                </div>
              </div>
              <div className="input-container">
                <div className='row '>
                  <div className=''>
                    <label htmlFor="inputCity" className="label">City</label>
                  </div>
                  <div className="">
                    <TextField type="text"  elementId="inputCity" 
                          validation={
                            { required:false,}
                          } 
                          value={personalHeads.City}
                          onChange={(value,errorMessage)=>{ onChangeHandler('City',value,errorMessage) }}
                    />
                  </div>
                </div>
              </div> 
          </div>
          
          <div className=" input-row-cont">
              <div className="input-container-text">
                <div className='row '>
                  <div className=''>
                    <label htmlFor="Textarea" className="label">Objective</label>
                  </div>
                  <div className=''>
                    <TextArea elementId="Textarea" value={personalHeads.Objective}
                              onChange={(value)=>{ onChangeHandler('Objective',value) }}
                    />
                  </div>
                  
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default PersonalInfo
