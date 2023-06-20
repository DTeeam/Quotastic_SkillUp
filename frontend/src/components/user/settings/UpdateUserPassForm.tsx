import {
  UpdateUserFields,
  useCreateUpdateUserForm,
} from '../../../hooks/react-hook-form/useCreateUpdateUser';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { Controller } from 'react-hook-form';
import { routes } from '../../../constants/routesConstants';
import { Form, FormLabel, ToastContainer } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as API from '../../../api/Api';
import { StatusCode } from '../../../constants/errorConstants';
import { UserType } from '../../../models/auth';
import { observer } from 'mobx-react';
import authStore from 'stores/auth.store';

interface Props {
  defaultValues?: UserType;
  onSubmitSuccess: () => void;
}

const UpdateUserPassForm: FC<Props> = ({ defaultValues, onSubmitSuccess }) => {
  const { handleSubmit, errors, control, reset } = useCreateUpdateUserForm({
    defaultValues: authStore.user || undefined,
  });

  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    await handleUpdate(data);
  });

  const onError = () => {
    console.log('error');
  };

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await API.updateUser(data, authStore.user?.id as string);

    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      onSubmitSuccess();
      authStore.updateUser(response.data);
      console.log(authStore.user?.first_name);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} onError={onError}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="email">Current password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Password"
                aria-describedby="password"
                className={
                  errors.email ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.email && (
                <div className="invalid-feedback text-danger">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="first_name">New password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="New password"
                aria-describedby="password"
                className={
                  errors.first_name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.first_name && (
                <div className="invalid-feedback text-danger">
                  {errors.first_name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="last_name">Confirm new password</FormLabel>
              <input
                {...field}
                type="confirm_password"
                aria-label="Confirm password"
                aria-describedby="confirm_password"
                className={
                  errors.last_name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.last_name && (
                <div className="invalid-feedback text-danger">
                  {errors.last_name.message}
                </div>
              )}
            </Form.Group>
          )}
        />

        <Button className="w-100" type="submit">
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

export default observer(UpdateUserPassForm);
