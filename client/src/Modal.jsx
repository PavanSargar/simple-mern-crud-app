import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import "./App.css";

function UpdateModal(props) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShow(false);
    
    
  };
  const handleShow = () => setShow(true);

  const handleUpdateData = () => {

    const updatedData = {
      id: props.id,
      name: name,
      age: age,
      description: description
    };

    //passing a function as a object in props to uplift the component data to parent
    props.onSaveUpdateData(updatedData);
    setShow(false)
  }


  return (
    <>
      <Button
        className="friend-card-btn" variant="primary" size="md" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control onChange={(e) => {setName(e.target.value)}} type="text" placeholder="New Name" className="modal-input" />
            <Form.Control onChange={(e) => {setAge(e.target.value)}} type="number" placeholder="New Age" className="modal-input" />
            <Form.Control onChange={(e) => {setDescription(e.target.value)}} type="text" placeholder="New Description" className="modal-input"/>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-buttons">
          <Button className="modal-button" size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            className="modal-button"
            disabled={!name || !age || !description}
            size="lg" 
            variant="primary" 
            onClick={handleUpdateData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
