import {
  UpdateUserFields,
  useCreateUpdateUserForm,
} from "../../../hooks/react-hook-form/useCreateUpdateUser";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { Controller } from "react-hook-form";
import { routes } from "../../../constants/routesConstants";
import { Form, FormLabel, ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as API from "../../../api/Api";
import { StatusCode } from "../../../constants/errorConstants";
import { UserType } from "../../../models/auth";
import { observer } from "mobx-react";
import authStore from "stores/auth.store";
import { userStorage } from "utils/localStorage";
import Avatar from "react-avatar";

interface Props {
  defaultValues?: UserType;
  onSubmitSuccess: () => void;
}

const UpdateUserAvatarForm: FC<Props> = ({
  defaultValues,
  onSubmitSuccess,
}) => {
  const { handleSubmit, errors, control, reset } = useCreateUpdateUserForm({
    defaultValues: authStore.user || undefined,
  });

  const [apiError, setApiError] = useState("");
  const [showError, setShowError] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState(false);

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    await handleUpdate(data);
  });

  const onError = () => {
    console.log("error");
  };

  const handleUpdate = async (data: UpdateUserFields) => {
    try {
      const response = await API.updateUser(data, authStore.user?.id as string);

      if (
        response.data?.statusCode === StatusCode.BAD_REQUEST ||
        response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(response.data.message);
        setShowError(true);
        return;
      }

      const formData = new FormData();
      if (file) {
        formData.append("avatar", file, file.name);
      }
      const fileResponse = await API.uploadAvatar(formData, response.data.id);
      if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message);
        setShowError(true);
      } else if (
        fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(fileResponse.data.message);
        setShowError(true);
      } else {
        onSubmitSuccess();
        authStore.updateUser(response.data);
      }
    } catch (error) {
      // Handle unexpected errors or exceptions
      console.error("An error occurred:", error);
      setApiError("An error occurred while updating the user.");
      setShowError(true);
    }
  };
  const handleFileError = () => {
    if (!file) setFileError(true);
    else setFileError(false);
  };

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} onError={onError}>
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <FormLabel htmlFor="avatar" id="avatar-p">
            <Avatar
              round
              src={
                preview
                  ? preview
                  : `${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`
              }
              alt="Avatar"
            />
          </FormLabel>
          <input
            onChange={handleFileChange}
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className="d-none"
          />
          {fileError && (
            <div className="d-block invalid-feedback text-danger mb-2 text-center">
              Field avatar is required
            </div>
          )}
        </Form.Group>

        <Button
          type="submit"
          onMouseUp={defaultValues ? undefined : handleFileError}
        >
          Submit
        </Button>
      </Form>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-auto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default observer(UpdateUserAvatarForm);
