import {
  CreateUpdateQuoteFields,
  useCreateUpdateQuoteForm,
} from 'hooks/react-hook-form/useCreateUpdateQuote';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { Form, FormLabel } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { routes } from 'constants/routesConstants';
import Button from 'react-bootstrap/Button';
import * as API from 'api/Api';
import { StatusCode } from 'constants/errorConstants';
import { QuoteType } from 'models/quote';

interface Props {
  defaultValues?: QuoteType;
}

const CreateUpdateQuoteForm: FC<Props> = ({ defaultValues }) => {
  const { handleSubmit, errors, control } = useCreateUpdateQuoteForm({
    defaultValues,
  });
  const navigate = useNavigate();

  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = handleSubmit(async (data: CreateUpdateQuoteFields) => {
    if (!defaultValues) await handleAdd(data);
    else await handleUpdate(data);
  });

  const onError = () => {
    console.log('error');
  };

  const handleAdd = async (data: CreateUpdateQuoteFields) => {
    const response = await API.createQuote(data);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      window.location.reload();
      navigate(`${routes.HOME}`);
    }
  };
  const handleUpdate = async (data: CreateUpdateQuoteFields) => {
    console.log('UPDEJT');

    const response = await API.updateQuote(data, defaultValues?.id as string);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      navigate(`${routes.HOME}`);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} onError={onError}>
        <Controller
          control={control}
          name="quote"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="quote">Quote</FormLabel>
              <input
                {...field}
                type="quote"
                aria-label="Quote"
                aria-describedby="quote"
                className={
                  errors.quote ? 'form-control is-invalid' : 'form-control'
                }
              />

              {errors.quote && (
                <div className="invalid-feedback text-danger">
                  {errors.quote.message}
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

export default CreateUpdateQuoteForm;
