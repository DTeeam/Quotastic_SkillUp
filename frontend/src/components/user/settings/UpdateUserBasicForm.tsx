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

const UpdateUserBasicForm: FC<Props> = ({ defaultValues, onSubmitSuccess }) => {
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
          name="email"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="email">Mail</FormLabel>
              <input
                {...field}
                type="email"
                aria-label="Email"
                aria-describedby="email"
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
          name="first_name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <input
                {...field}
                type="text"
                aria-label="First name"
                aria-describedby="first_name"
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
          name="last_name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <input
                {...field}
                type="last_name"
                aria-label="Last name"
                aria-describedby="last_name"
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

export default observer(UpdateUserBasicForm);
