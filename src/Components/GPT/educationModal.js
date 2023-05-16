import React, { useState } from "react";
import "./modal.css";
import logo from '../Data/images/openai-svg.svg'
import GTP from '../GPT/App'

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [showAnim, setshowAnim] = useState(false)
  const T = document.querySelector(".edu-gtp");

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
      addClass(T, 'activeai')
    } else{
      removeClass(T, 'activeai')
    }
    // T.classList.add('activeai');


    // if (T.style.display === 'none'){
    //   T.style.display = 'block'
    // } else{
    //   T.style.display = 'none'
    // }

    const mylogo = document.querySelector('.gtp-modal');
    if (mylogo) {
    mylogo.classList.add('fade');
    }
    
  };

  // if(modal) {
  //   document.body.classList.add('active-modal')
  // } else {
  //   document.body.classList.remove('active-modal')
  // }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
       <img className="openai-button" src={logo} alt=""/>
      </button>

      {modal && (
        <div className="gtp-modal">
          <div onClick={toggleModal}></div>
          <div className="modal-content">
          <GTP message={"Education"}/>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}