import CreateUpdateQuoteForm from 'components/quote/CreateUpdateQuoteForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const AddQuotePop = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}> + </button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <h4>
            Are you feeling <span className="orange">inspired</span>
          </h4>
          <p>You can post quotes. You can delete them on your profile.</p>
          <CreateUpdateQuoteForm />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddQuotePop;
