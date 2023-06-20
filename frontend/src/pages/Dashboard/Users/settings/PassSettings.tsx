import UpdateUserPassForm from 'components/user/settings/UpdateUserPassForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const UserPassSettingsPop = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmitSuccess = () => {
    setShowNewModal(true);
  };

  const closeNewModal = () => {
    setShowNewModal(false);
    window.location.reload();
  };

  return (
    <div>
      <button onClick={openModal}>Change password</button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <h4>
            Profile <span className="orange">settings</span>
          </h4>
          <p>Change your password</p>
          <UpdateUserPassForm onSubmitSuccess={onSubmitSuccess} />
          <button onClick={closeModal}>Cancel</button>
        </Modal.Body>
      </Modal>
      {showNewModal && (
        <Modal show={showNewModal} onHide={closeNewModal}>
          <Modal.Body>
            <h4>
              Profile <span className="orange">settings</span>
            </h4>
            <p>Your settings are saved.</p>
            <button onClick={closeNewModal}>Close</button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
export default UserPassSettingsPop;
