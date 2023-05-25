import Layout from 'components/ui/Layout';
import { routes } from 'constants/routesConstants';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <Layout>
      <div>
        <h1>
          Welcome to <p className="orange"> Quotastic</p>
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
          <p className="orange">fantastic quotes</p>
        </h2>
      </div>
      <div>
        <h4 className="orange">Most upvoted quotes</h4>
        <p>
          Most upvoted quotes on the platform. Sign up or login to like the
          quotes and keep them saved in your profile
        </p>
      </div>

      <Link to={routes.SIGNUP}>
        <Button>Sign up to see more</Button>
      </Link>
    </Layout>
  );
};

export default Home;
