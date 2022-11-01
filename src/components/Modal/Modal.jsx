import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ModalWindow } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {    
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {        
          this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {      
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop  onClick={this.handleBackdropClick}>
        <ModalWindow >{this.props.children}</ModalWindow>
      </Backdrop>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}