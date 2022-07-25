import React, {  createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import "./Modal.css";

export const ModalContext = createContext();

export function ModalProvider({children}){
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

function Modal({onClose, children}){
    const modalNode = useContext(ModalContext);

    if(!modalNode) return null;

    return ReactDOM.createPortal(
            <div id="modal">
                <div id="modal-background" onClick={onClose}></div>
                <div id="modal-content">
                    {children}
                </div>
            </div>
            ,modalNode
    );
}

export default Modal;
