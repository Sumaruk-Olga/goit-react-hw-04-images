import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ModalWindow } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => { 
    const handleKeyDown = e => {
    if (e.code === 'Escape') {        
          onClose();
    }
  };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);  

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {      
      onClose();
    }
  };

  
    return createPortal(
      <Backdrop  onClick={handleBackdropClick}>
        <ModalWindow >{children}</ModalWindow>
      </Backdrop>,
      modalRoot,
    );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}