import React from 'react';
import Modal from 'react-modal';

// Establece el elemento de la aplicación para el manejo de accesibilidad
Modal.setAppElement('#root');

const EventModal = ({ isOpen, handleClose, title, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <h2>{title}</h2>
      {children}
      {/* Contenido adicional del modal, como formularios para agregar o editar eventos */}
    </Modal>
  );
};

export default EventModal;
