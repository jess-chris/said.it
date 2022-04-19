import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children, currentId}) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;
  if (!currentId) currentId = 'modal-content';

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id={currentId}>
        {children}
      </div>
    </div>,
    modalNode
  );
}