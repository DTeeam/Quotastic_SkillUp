import UpdateUserBasicForm from 'components/user/settings/UpdateUserBasicForm';
import UpdateUserPassForm from 'components/user/settings/UpdateUserPassForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const UserSettingsPop = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openPassModal = () => {
    setShowModal(false);
    setShowPassModal(true);
  };

  const closePassModal = () => {
    setShowPassModal(false);
    setShowModal(true);
  };

  const onSubmitSuccess = () => {
    if (showPassModal) {
      setShowPassModal(false);
    }
    setShowModal(false);
    setShowSavedModal(true);
  };

  const closeSavedModal = () => {
    setShowSavedModal(false);
    window.location.reload();
  };

  return (
    <div>
      <button onClick={openModal}>Settings</button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <h4>
            Profile <span className="orange">settings</span>
          </h4>
          <p>Change your profile settings</p>
          <UpdateUserBasicForm onSubmitSuccess={onSubmitSuccess} />
          <button onClick={openPassModal}>Change password</button>
          <button onClick={closeModal}>Cancel</button>
        </Modal.Body>
      </Modal>
      {showPassModal && (
        <Modal show={showPassModal} onHide={closePassModal}>
          <Modal.Body>
            <h4>
              Change <span className="orange">password</span>
            </h4>
            <p>Change your password</p>
            <UpdateUserPassForm onSubmitSuccess={onSubmitSuccess} />
            <button onClick={closePassModal}>Cancel</button>
          </Modal.Body>
        </Modal>
      )}
      {showSavedModal && (
        <Modal show={showSavedModal} onHide={closeSavedModal}>
          <Modal.Body>
            <h4>
              Profile <span className="orange">settings</span>
            </h4>
            <p>Your settings are saved.</p>
            <button onClick={closeSavedModal}>Close</button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default UserSettingsPop;
