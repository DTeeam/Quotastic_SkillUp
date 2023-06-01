import DisplayQuotesForm from 'components/quote/DisplayQuoteForm';
import Layout from 'components/ui/Layout';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import authStore from 'stores/auth.store';

const Home: FC = () => {
  if (!authStore.user) {
    return <Navigate to="/landing" />;
  }
  return (
    <Layout>
      <>
        HOME
        <DisplayQuotesForm />
      </>
    </Layout>
  );
};

export default Home;
