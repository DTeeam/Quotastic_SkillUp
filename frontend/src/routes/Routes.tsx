import { FC, lazy, Suspense } from 'react';
import { Route, RouteProps, Routes as Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType;
};

/* Public routes */
const Landing = lazy(() => import('pages/Landing'));

/* Private routes */
const Home = lazy(() => import('pages/Home'));

//const DashboardUsers = lazy(() => import('pages/Dashboard/Users'));
//const DashboardUsersAdd = lazy(() => import('pages/Dashboard/Users/Add'));
//const DashboardUsersEdit = lazy(() => import('pages/Dashboard/Users/Edit'));

/* Restricted routes */
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'));

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/signup',
    children: <Register />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/',
    children: <Home />,
  },

  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/landing',
    children: <Landing />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
];

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r;
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            );
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            );
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          );
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
