import DashboardLayout from 'components/ui/DashboardLayout';
import { FC, useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useQuery } from 'react-query';
import * as API from 'api/Api';

const DisplayDailyQuotesForm: FC = () => {
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ['fetchQuote'],
    () => API.fetchRandQuote(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <DashboardLayout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="quote-container">
            <div className="quote-item">
              <h3 className="quote-h3">
                {data.data.votes} {data.data.quote}
              </h3>

              {data.data.avatar && (
                <p>
                  <img
                    className="avatar_img"
                    src={`${process.env.REACT_APP_API_URL}/files/${data.data.avatar}`}
                  />
                  {data.data.first_name} {data.data.last_name}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </DashboardLayout>
  );
};

export default DisplayDailyQuotesForm;
