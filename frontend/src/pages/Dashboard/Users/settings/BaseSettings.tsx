import UpdateUserBasicForm from 'components/user/settings/UpdateUserBasicForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const UserSettingsPop = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmitSuccess = () => {
    setShowModal(false);
    setShowNewModal(true);
  };

  const NewModalComponent = () => {
    if (!showNewModal) {
      return null;
    }

    const closeNewModal = () => {
      setShowNewModal(false);
      window.location.reload();
    };

    return (
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
        {
          <div>
            <Modal.Body>
              <h4>
                Profile <span className="orange">settings</span>
              </h4>
              <p>Your settings are saved.</p>
              <button onClick={closeNewModal}>Close</button>
            </Modal.Body>
          </div>
        }
      </Modal>
    );
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
          <UpdateUserBasicForm onSubmitSuccess={onSubmitSuccess} />
          <button onClick={closeModal}>Cancel</button>
        </Modal.Body>
      </Modal>
      <NewModalComponent />
    </div>
  );
};

export default UserSettingsPop;
