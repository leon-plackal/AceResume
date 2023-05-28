import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '../InputComponents/TextField'
import { updateWorkEx, addArrayElement, removeArrayElement, updateErrorMessages } from '../../ReduxManager/dataStoreSlice'
import GTPWorkPopup from '../GPT/workModal'
import TipTapWork from '../InputComponents/TiptapWork'
import { TiTick } from 'react-icons/ti';
import { BiSad } from 'react-icons/bi';

// this component renders the work experience page inside the details filling page.
function WorkEx(props) {
    const workHeads = useSelector(state => state.dataStore.workEx) //this state is used to store workEx object of dataStoreSlice.
    const dispatch = useDispatch();
    const [wordCount, setwordCount] = useState(0)

    // document.getElementById('count').innerHTML = "Characters left: " + (500 - this.value.length);


    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'TextField'
        dispatch(updateWorkEx({
            //this function updates the targeted key of the workEx element of dataStore in dataStoreSlice.js //
            key: key,
            value: value,
            index: index,
        }))
        if (errorMessage !== undefined) {
            dispatch(updateErrorMessages({
                // this function is called each time when there is a validatin check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
                key: key,
                value: errorMessage,
                index: index
            }))
        }
    }

    function AddExperience() {
        //this function is used to push a blank object in the workEx element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'workEx',
            element: {
                title: "",
                orgName: "",
                startYear: "",
                endYear: "",
                jobDescription: "",
                extraJobDesc: [{ Jobdescription: "" }],
            },

        }))
    }

    function RemoveExperience() {
        //this function deletes the latest saved details in the workEx element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "workEx" }))
        //after deletion of workEx element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'title',
            value: "",
            index: workHeads.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'orgName',
            value: "",
            index: workHeads.length - 1
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

    // update word count in textarea every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const editor = document.getElementById('tt-work').children.item(1)
            const e2 = editor.children
            for (var i = 0; i < e2.length; i++) {
            const ptag = e2[i];
            setwordCount(ptag.innerText.length)
        }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      });

    return (
        <div className='section-container' style={{ padding: "2rem 4rem", textAlign: "left", }}>
            <h2>Work Experience</h2>

            {workHeads.map((workHeading, index) => {
                return (
                    <div key={index}>
                        <div >
                            <h5>Experience {index + 1}</h5>
                            <hr />
                            <div className="input-row-cont">
                                <div className="input-container">
                                    <label className="label" htmlFor="title" >Job Title*</label>
                                    <TextField
                                        type="text" elementId="title" placeholder='Enter Job Title'
                                        value={workHeading.title}
                                        onChange={
                                            // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                                            //the user given input will be send as value alongwith errorMessage , if there is any .
                                            (value, errorMessage) => {
                                                //this function calls back onChangeHandler which will update targeted key of 'WorkEx' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                                                onChangeHandler('title', value, index, errorMessage)
                                            }
                                        }
                                        validation={{
                                            //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                                            required: true
                                        }}
                                    />

                                </div>
                                <div className="input-container">
                                    <label className="label" htmlFor="name" >Organization Name*</label>
                                    <TextField type="text" elementId="name" placeholder='Enter Organization Name'
                                        value={workHeading.orgName}
                                        onChange={(value, errorMessage) => { onChangeHandler('orgName', value, index, errorMessage) }}
                                        validation={{
                                            required: true
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="input-row-cont">
                                <div className="input-container">
                                    <label htmlFor="start" className="label" >Start year</label>
                                    <select id="start" className="form-select" value={workHeading.startYear}
                                        onChange={(e) => {
                                            dispatch(updateWorkEx({
                                                key: 'startYear',
                                                value: e.target.value,
                                                index: index,
                                            }))
                                        }}>
                                        <option > Select year</option>
                                        {
                                            year.map((yr, i) => {
                                                return (
                                                    <option key={i}
                                                        value={yr}>{yr}</option>
                                                )
                                            })}
                                    </select>

                                </div>
                                <div className="input-container">
                                    <label htmlFor="end" className="label" >End year</label>
                                    <select id="end" className="form-select" value={workHeading.endYear}
                                        onChange={(e) => {
                                            dispatch(updateWorkEx({
                                                key: 'endYear',
                                                value: e.target.value,
                                                index: index,
                                            }))
                                        }}>
                                        <option > Select year</option>
                                        {
                                            year.map((yr, i) => {
                                                return (
                                                    <option key={i} >{yr}</option>
                                                )
                                            })}

                                    </select>

                                </div>
                            </div>

                            <div className="input-row-cont">
                                <div className="input-container-text">
                                    <div className='label-container'>
                                        <label htmlFor="type" className="label">Summary</label>
                                    </div>

                                    <div className='text-area-container'>
                                        <div className='animate-overflow work-gtp'></div>
                                        {/* <TextArea elementId="Textarea"
                                            value={workHeading.jobDescription}
                                            onChange={(value) => { onChangeHandler('jobDescription', value, index) }}
                                        /> */}
                                        <TipTapWork setvalue={index} />
                                        <div className='gtp-btn-container'>
                                            <h6>Need Help?</h6>
                                            <GTPWorkPopup index={index} />
                                        </div>
                                        <button id='count'>{wordCount > 200 ? <TiTick/> : <BiSad/>}{wordCount} / 200
                                            <div >

                                            </div>
                                        </button>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                )
            })}
            <div className='add-remove-container'>
                <button
                    className=''
                    onClick={AddExperience}
                >
                    Add new
                </button>

                <button
                    className=''
                    onClick={RemoveExperience}
                >
                    Remove
                </button>
            </div>
        </div>

    )
}

export default WorkEx
