import authStore from 'stores/auth.store';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { routes } from 'constants/routesConstants';

const PrivateRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  const location = useLocation();

  if (location.pathname === routes.HOME && !authStore.user) {
    return <Navigate to={routes.LANDING} />;
  } else if (!authStore.user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return children as JSX.Element;
};

export default observer(PrivateRoute);
