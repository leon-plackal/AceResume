import React, { useState } from "react";
import "./modal.css";
import logo from '../Data/images/openai-svg.svg'
import GTP from '../GPT/App'
import xbutton from '../Data/images/x-symbol.svg'

export default function Modal(index) {
  const [modal, setModal] = useState(false);
  const [showAnim, setshowAnim] = useState(false)
  let eduHeader = document.querySelector(".edu-gtp");

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
      addClass(eduHeader, 'activeai')

      
    } else{
      removeClass(eduHeader, 'activeai')
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
          <GTP message={"Objective"} index={index}/>
            <button className="close-modal" onClick={toggleModal}>
              <img src={xbutton} alt="Close"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}