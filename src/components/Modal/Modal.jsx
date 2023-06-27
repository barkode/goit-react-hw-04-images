import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');

export const Modal = ({ largeImageURL, alt, onCloseModal }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);

  // useEffect(() => {
  //   const handleKeydown = e => {
  //     if (e.code === 'Escape') {
  //       onCloseModal();
  //     }
  //   };
  //   return () => window.removeEventListener('keydown', handleKeydown);
  // }, [onCloseModal]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <ModalContent className="modal">
        <img src={largeImageURL} alt={alt} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};
