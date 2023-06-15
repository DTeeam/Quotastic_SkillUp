import UpdateUserBasicForm from 'components/user/settings/UpdateUserBasicForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const UserSettingsPop = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}> Settings </button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <h4>
            Profile <span className="orange">settings</span>
          </h4>
          <p>Change your profile settings</p>
          <UpdateUserBasicForm />
          <button onClick={closeModal}>Cancel</button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserSettingsPop;
