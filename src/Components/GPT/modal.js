import React, { useState } from "react";
import "./modal.css";
import logo from '../Data/images/openai-svg.svg'
import GTP from '../GPT/App'

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
       <img className="openai-button" src={logo}/>
      </button>

      {modal && (
        <div className="gtp-modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <GTP/>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}