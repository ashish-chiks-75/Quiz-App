import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { showModal, closeModal, correct, index } = useGlobalContext();
  return (
    <div className={`modal-container ${showModal ? "isOpen" : null}`}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>You have succesfully finished the quiz</p>
        <p>
          Result: {correct} Answers out of {index+1} Questions
        </p>
        <button className="close-btn" onClick={() => closeModal()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
