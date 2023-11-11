import React, { useState } from "react";
import "./modal.css";
import logo from '../Data/images/openai-svg.svg'
import GTP from '../GPT/App'
import xbutton from '../Data/images/x-symbol.svg'
import { useSelector } from 'react-redux'

export default function Modal(index) {
  const [modal, setModal] = useState(false);
  const [showAnim, setshowAnim] = useState(false)
  const workHeader = document.querySelector(".work-gtp");
  const dataStore = useSelector(state => state.dataStore)

  const currentIndex = index["index"]
  var role = dataStore.workEx[currentIndex].title
  var yrsExperience = dataStore.workEx[currentIndex].endYear - dataStore.workEx[currentIndex].startYear
  let experience = 'mid-level'
  if (yrsExperience > 5){
    experience = 'senior'
  } else if (yrsExperience < 2){
    experience = 'junior'
  } else{
    experience = 'mid-level'
  }

  function addClass(el,name) {
    el.className += ' '+name;
  }
  function removeClass(el,name) {
    el.className = el.className.replace(name,'');
  }

  const toggleModal = () => {
    setModal(!modal);

    setshowAnim(!showAnim)
    if (!showAnim) {
      Array.from(document.querySelectorAll('.activeai')).forEach(
        (el) => el.classList.remove('activeai')
      );
      addClass(workHeader, 'activeai')

      
    } else{
      removeClass(workHeader, 'activeai')
    }

  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
       <img className="openai-button" src={logo} alt=""/>
      </button>

      {modal && (
        <div className="gtp-modal">
          <div onClick={toggleModal}></div>
          <div className="modal-content">
          <GTP message={`write a good resume job experience section for a ${role} with ${experience} experience`}
          index={index}
          />
            <button className="close-modal" onClick={toggleModal}>
              <img src={xbutton} alt={"close"}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}