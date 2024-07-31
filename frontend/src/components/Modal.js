import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

const Modal = setIsOpen => {
  return (
    <div>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
