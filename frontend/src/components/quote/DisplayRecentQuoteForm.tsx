import DashboardLayout from 'components/ui/DashboardLayout';
import { FC, useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import useMediaQuery from 'hooks/useMediaQuery';
import { useMutation, useQuery } from 'react-query';
import * as API from 'api/Api';
import { StatusCode } from 'constants/errorConstants';
import { QuoteType } from 'models/quote';

const DisplayRecentQuotesForm: FC = () => {
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, refetch } = useQuery(
    ['fetchQuotes', pageNumber],
    () => API.fetchQuotes(pageNumber),
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
            {data?.data?.data?.map((quote: QuoteType, index: number) => (
              <div key={index} className="quote-item">
                <h3 className="quote-h3">
                  {quote.votes} {quote.quote}
                </h3>
                {quote.user && (
                  <p>
                    {
                      <img
                        className="avatar_img"
                        src={`${process.env.REACT_APP_API_URL}/files/${quote.user.avatar}`}
                      />
                    }
                    {quote.user.first_name} {'  '}
                    {quote.user.last_name}
                  </p>
                )}
              </div>
            ))}
          </div>

          {data.last_page > 1 && (
            <div>
              <Button
                className="me-2"
                onClick={() => setPageNumber((prev) => prev - 1)}
                disabled={pageNumber === 1}
              >
                Prev page
              </Button>
              <Button
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={pageNumber === data?.data?.data?.last_page}
              >
                Next page
              </Button>
            </div>
          )}
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

export default DisplayRecentQuotesForm;
