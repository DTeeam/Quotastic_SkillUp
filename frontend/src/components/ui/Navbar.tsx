import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { routes } from 'constants/routesConstants';
import { FC, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import authStore from 'stores/auth.store';
import { StatusCode } from 'constants/errorConstants';
import * as API from 'api/Api';
import Avatar from 'react-avatar';
import AddQuotePop from 'pages/Dashboard/Quotes/Add';
import { Link } from 'react-router-dom';
import UserSettingsPop from 'pages/Dashboard/Users/settings';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showError, setShowError] = useState(false);

  const location = useLocation();

  const signout = async () => {
    const response = await API.signout();
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message);
      setShowError(true);
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message);
      setShowError(true);
    } else {
      authStore.signout();
      navigate('/landing');
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-xxl p-4 pb-0">
            <div>
              <Link to={routes.HOME}> Quotastic"</Link>
            </div>
            <div
              className="collapse navbar-collapse justify-content-end align-items-center"
              id="navbarTogglerDemo02"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                {authStore.user ? (
                  <>
                    <li className="nav-item pe-4">
                      <NavLink className="nav-link" to={routes.HOME}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item pe-4">
                      <UserSettingsPop />
                    </li>
                    <li className="nav-item pe-4">
                      <Button className="btn btn-dark" onClick={signout}>
                        Logout
                      </Button>
                    </li>
                    <Avatar
                      className="topbar__avatar"
                      round
                      src={`${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`}
                      alt={
                        authStore.user?.first_name || authStore.user?.last_name
                          ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
                          : authStore.user?.email
                      }
                    />
                    <AddQuotePop />
                  </>
                ) : (
                  <>
                    {location.pathname === routes.LOGIN ? (
                      <li className="nav-item pe-4">
                        <NavLink className="nav-link" to={routes.SIGNUP}>
                          <Button>Sign up</Button>
                        </NavLink>
                      </li>
                    ) : location.pathname === routes.SIGNUP ? (
                      <li className="nav-item">
                        <NavLink className="nav-link pe-0" to={routes.LOGIN}>
                          <Button>Login</Button>
                        </NavLink>
                      </li>
                    ) : (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link pe-0" to={routes.SIGNUP}>
                            <Button>Sign up</Button>
                          </NavLink>
                        </li>
                        <li className="nav-item pe-4">
                          <NavLink className="nav-link" to={routes.LOGIN}>
                            <Button>Login</Button>
                          </NavLink>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
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
    </>
  );
};

export default Navbar;
