import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '../InputComponents/TextField'
import { updateKeySkills, addArrayElement, removeArrayElement } from '../../ReduxManager/dataStoreSlice'

// this component renders the key skills page inside the details filling page.

function KeySkills(props) {
  const skillHeads = useSelector(state => state.dataStore.skills) // this state stores the skills of dataStoreSlice.
  const dispatch = useDispatch();

  function AddSkill() {
    //this function is used to push a blank object {skillName:"",} in the skills element of dataStoreSlice,
    //when the user clicks on the Add-Skill button to add more related details//
    dispatch(addArrayElement({
      key: 'skills',
      element: { skillName: "", }
    })
    )
  }
  function RemoveSkill() {
    //this function deletes the latest saved details in the skills element, when the user clicks on the remove button.
    dispatch(removeArrayElement({ key: "skills" }))
  }

  return (
    <div className="section-container" style={{ textAlign: "left", padding: '4rem' }}>
      <h1>Key Skills</h1>
      <hr />

      {skillHeads.map((item, index) => {
        return (
          <div key={index} className=''>
            <div className='input-row-cont dflex' style={{ justifyContent: 'left' }}>
              <div className='input-container' >
                <TextField type="text" value={item.skillName}
                  onChange={(value) => {
                    // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and the user given input will be send as value  .

                    dispatch(updateKeySkills({
                      //this function updates the targeted key i.e skillName of skills element of dataStore in dataStoreSlice.js //

                      key: 'skillName',
                      value: value,
                      index: index,
                    }))
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
      <div className='add-remove-container'>
        <div className=''>
          <button className='p-2'
            onClick={AddSkill}>
            Add-Skill

          </button>
        </div>
        <div className=''>
          <button className='p-2'
            onClick={RemoveSkill}>
            Remove

          </button>
        </div>
      </div>

    </div>
  )
}

export default KeySkills
