import DisplayUpvotedQuotesForm from 'components/quote/DisplayUpvotedQuoteForm';
import Layout from 'components/ui/Layout';
import { routes } from 'constants/routesConstants';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';
import authStore from 'stores/auth.store';

const Landing: FC = () => {
  if (authStore.user) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <div>
        <h1>
          Welcome to <span className="orange"> Quotastic</span>
        </h1>
        <h5>
          Quotastic is free online platform for you to explore the quips,
          quotes, and proverbs. Sign up and express yourself.
        </h5>
        <Link to={routes.SIGNUP}>
          <Button>Sign up</Button>
        </Link>
      </div>
      <div>
        <h2>
          Explore the world of
          <span className="orange"> fantastic quotes</span>
        </h2>
      </div>
      <div>
        <h4 className="orange">Most upvoted quotes</h4>
        <p>
          Most upvoted quotes on the platform. Sign up or login to like the
          quotes and keep them saved in your profile
        </p>
        <DisplayUpvotedQuotesForm />
      </div>

      <Link to={routes.SIGNUP}>
        <Button>Sign up to see more</Button>
      </Link>
    </Layout>
  );
};

export default Landing;
