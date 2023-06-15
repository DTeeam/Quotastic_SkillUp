import DashboardLayout from 'components/ui/DashboardLayout';
import { FC, useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { useInfiniteQuery } from 'react-query';
import * as API from 'api/Api';
import { QuoteType } from 'models/quote';
import authStore from 'stores/auth.store';

const DisplayRecentQuotesForm: FC = () => {
  const [apiError] = useState('');
  const [showError, setShowError] = useState(false);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      'fetchRecentQuotes',
      ({ pageParam = 1 }) => API.fetchRecentQuotes(pageParam),
      {
        getNextPageParam: (lastPage) => {
          const { meta } = lastPage.data;
          const nextPage = parseInt(meta.page, 10) + 1;
          return nextPage <= meta.last_page ? nextPage : undefined;
        },

        keepPreviousData: false,
        refetchOnWindowFocus: false,
      }
    );
  const quotes = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <DashboardLayout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="quote-container">
            {quotes.map((quote: QuoteType, index: number) => (
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
                        alt=""
                      />
                    }
                    {quote.user.first_name} {'  '}
                    {quote.user.last_name}
                  </p>
                )}
              </div>
            ))}
          </div>

          {authStore.user && (
            <div>
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading...' : 'LOAD MORE'}
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
