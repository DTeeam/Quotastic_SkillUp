import DisplayDailyQuotesForm from 'components/quote/DisplayDailyQuoteForm';
import DisplayRecentQuotesForm from 'components/quote/DisplayRecentQuoteForm';
import DisplayUpvotedQuotesForm from 'components/quote/DisplayUpvotedQuoteForm';
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
        <div className="container">
          <h4 className="orange">Quote of the day</h4>
          Quote of the day is a randomly chosen quote
          <DisplayDailyQuotesForm />
          <h4 className="orange">Most upvoted quotes</h4>
          Most upvoted quotes on the platform. Give a like to the ones you like
          to keep them saved in your profile.
          <DisplayUpvotedQuotesForm />
          <h4 className="orange">Most recent quotes</h4>
          Recent quotes updates as soon user adds new quote. Go ahed show them
          that you seen the new quote and like the ones you like.
          <DisplayRecentQuotesForm />
        </div>
      </>
    </Layout>
  );
};

export default Home;
