import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '../InputComponents/TextField'
import { updateEducation, addArrayElement, removeArrayElement, updateErrorMessages } from '../../ReduxManager/dataStoreSlice'
import GTPEducationPopup from '../GPT/educationModal'
import TiptapEducation from '../InputComponents/TiptapEducation'


// this component renders the Education page inside the details filling page.
function Education(props) {
    const educationHeads = useSelector(state => state.dataStore.education)//this state is used to store education object of dataStoreSlice.

    const dispatch = useDispatch();
    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'TextField'
        dispatch(updateEducation({
            //this function updates the targeted key of education element of dataStore in dataStoreSlice.js //
            key: key,
            value: value,
            index: index,
        }))
        if (errorMessage !== undefined) {
            dispatch(updateErrorMessages({
                // this function is called each time when there is a validation check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
                key: key,
                value: errorMessage,
                index: index,
            }))
        }
    }
    function AddEducation() {
        //this function is used to push a blank object in the education element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'education',
            element: {
                Type: "",
                University: "",
                Degree: "",
                Start: "",
                End: ""
            }
        }))
    }
    function RemoveEducation() {
        //this function deletes the latest saved details in the education element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "education" }))
        //after deletion of education element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'University',
            value: "",
            index: educationHeads.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'Degree',
            value: "",
            index: educationHeads.length - 1
        }))
    }

    function yearRange(start, end) {
        //this function  is used to create list of years in a range to display list of options in the 'Select' input field of the form.
        var ans = [];
        for (let i = end; i >= start; i--) {
            ans.push(i);
        }
        return ans;
    }
    let year = yearRange(1960, 2023)
    return (
        <div className='section-container' style={{ padding: "4rem", textAlign: "left", }}>
            <h2>Education details</h2>
            <hr />
            {educationHeads.map((educationHeading, index) => {
                return (
                    <div key={index}>

                        <div className="input-row-cont">
                            <div className="input-container">
                                <label className="label" htmlFor="degree">Degree*</label>
                                <TextField type="text" elementId="Degree" placeholder='Degree' value={educationHeading.Degree}
                                    onChange={(value, errorMessage) => { onChangeHandler('Degree', value, index, errorMessage) }}
                                    validation={{
                                        required: true
                                    }}
                                />

                            </div>
                            <div className="input-container">
                                <label className="label" htmlFor="University">University*</label>
                                <TextField type="text" elementId="University" placeholder='University' value={educationHeading.University}
                                    onChange={
                                        // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                                        //the user given input will be send as value alongwith errorMessage , if there is any .
                                        (value, errorMessage) => {
                                            //this function calls back onChangeHandler which will update targeted key of 'WorkEx' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                                            onChangeHandler('University', value, index, errorMessage)
                                        }
                                    }
                                    validation={{
                                        //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                                        required: true
                                    }}
                                />

                            </div>

                        </div>
                        <div className="input-row-cont">
                            <div className="input-container-text">
                                <div className='row'>
                                    <div className='label-container'>
                                        <label htmlFor="type" className="label">Summary</label>
                                    </div>

                                    <div className='text-area-container'>
                                        <div className='animate-overflow edu-gtp'></div>
                                        <TiptapEducation
                                        setvalue={index}/>
                                        <div className='gtp-btn-container'>
                                            <h6>Need Help?</h6>
                                            <GTPEducationPopup />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="input-row-cont">
                            <div className="input-container">
                                <label htmlFor="Start" className="label">Start year</label>
                                <select id="Start" className="form-select" value={educationHeading.Start}
                                    onChange={(e) => {
                                        dispatch(updateEducation({
                                            key: 'Start',
                                            value: e.target.value,
                                            index: index,
                                        }))
                                    }}
                                >
                                    <option>Select year</option>
                                    {
                                        year.map((yr, i) => {
                                            return (
                                                <option key={i} value={yr}
                                                >{yr}
                                                </option>
                                            )
                                        })}
                                </select>

                            </div>
                            <div className="input-container">
                                <label htmlFor="end" className="label"> End year</label>
                                <select id="end" className="form-select" value={educationHeading.End}
                                    onChange={(e) => {
                                        dispatch(updateEducation({
                                            key: 'End',
                                            value: e.target.value,
                                            index: index,
                                        }))
                                    }}
                                >
                                    <option >Select year</option>
                                    {
                                        year.map((yr, i) => {
                                            return (
                                                <option key={i}
                                                    value={yr}
                                                >{yr}
                                                </option>
                                            )
                                        })}
                                </select>

                            </div>
                        </div>
                    </div>

                )
            })}
            <div className='add-remove-container'>
                <button
                    className=''
                    onClick={AddEducation}
                >
                    Add new
                </button>
                <button
                    className=''
                    onClick={RemoveEducation}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default Education
