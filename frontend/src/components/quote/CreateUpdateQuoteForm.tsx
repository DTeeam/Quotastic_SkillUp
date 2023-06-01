import {
  CreateUpdateQuoteFields,
  useCreateUpdateQuoteForm,
} from 'hooks/react-hook-form/useCreateUpdateQuote';
import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { Form } from 'react-bootstrap';
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

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    onSubmite();
  };

  const onSubmite = handleSubmit(async (data: CreateUpdateQuoteFields) => {
    console.log('REEEEEEE');

    if (!defaultValues) await handleAdd(data);
    else await handleUpdate(data);
  });

  const handleAdd = async (data: CreateUpdateQuoteFields) => {
    console.log('ADDED');

    const response = await API.createQuote(data);
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      console.log('response');

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
      <Form id="formToSubmit" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="quote"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <input
                {...field}
                type="text"
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

        <Button form="formToSubmit" className="w-100" type="submit">
          {defaultValues ? 'Update quote' : 'Submit'}
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
