import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function CustomModal({ isOpen, onClose, children }) {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      size="lg"
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa" }}>
        <Modal.Title>Resultados de búsqueda</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}