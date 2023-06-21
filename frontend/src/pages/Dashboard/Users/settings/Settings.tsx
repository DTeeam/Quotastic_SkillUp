import UpdateUserAvatarForm from 'components/user/settings/UpdateUserAvatarForm';
import UpdateUserBasicForm from 'components/user/settings/UpdateUserBasicForm';
import UpdateUserPassForm from 'components/user/settings/UpdateUserPassForm';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const UserSettingsPop = () => {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  const openBasicModal = () => {
    setShowBasicModal(true);
  };

  const openPassModal = () => {
    setShowBasicModal(false);
    setShowPassModal(true);
  };

  const openAvatarModal = () => {
    setShowBasicModal(false);
    setShowAvatarModal(true);
  };

  const closeBasicModal = () => {
    setShowBasicModal(false);
  };

  const closePassModal = () => {
    setShowPassModal(false);
    setShowBasicModal(true);
  };

  const closeAvatarModal = () => {
    setShowAvatarModal(false);
    setShowBasicModal(true);
  };

  const closeSavedModal = () => {
    setShowSavedModal(false);
    window.location.reload();
  };

  const onSubmitSuccessBasic = () => {
    setShowBasicModal(false);
    setShowSavedModal(true);
  };

  const onSubmitSuccessPass = () => {
    setShowPassModal(false);
    setShowSavedModal(true);
  };

  const onSubmitSuccessAvatar = () => {
    setShowAvatarModal(false);
    setShowSavedModal(true);
  };

  return (
    <div>
      <button onClick={openBasicModal}>Settings</button>
      <Modal show={showBasicModal} onHide={closeBasicModal}>
        <Modal.Body>
          <h4>
            Profile <span className="orange">settings.</span>
          </h4>
          <p>Change your profile settings</p>
          <UpdateUserBasicForm onSubmitSuccess={onSubmitSuccessBasic} />
          <button onClick={openPassModal}>Change password</button>
          <button onClick={openAvatarModal}>Change avatar</button>
          <button onClick={closeBasicModal}>Cancel</button>
        </Modal.Body>
      </Modal>
      {showPassModal && (
        <Modal show={showPassModal} onHide={closePassModal}>
          <Modal.Body>
            <h4>
              Profile <span className="orange">settings</span>
            </h4>
            <p>Change your password</p>
            <UpdateUserPassForm onSubmitSuccess={onSubmitSuccessPass} />
            <button onClick={closePassModal}>Cancel</button>
          </Modal.Body>
        </Modal>
      )}

      {showAvatarModal && (
        <Modal show={showAvatarModal} onHide={closeAvatarModal}>
          <Modal.Body>
            <h4>
              Profile <span className="orange">settings</span>
            </h4>
            <p>Change your profile photo</p>
            <UpdateUserAvatarForm onSubmitSuccess={onSubmitSuccessAvatar} />
            <button onClick={closeAvatarModal}>Cancel</button>
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
