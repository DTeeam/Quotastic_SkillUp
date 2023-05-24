import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const onDefault = () => {
  document.title = 'Quotes';
  document.body.id = '';
};
const onHome = () => {
  document.title = 'Quotes';
  document.body.id = 'home-page';
};
const onDashboard = () => {
  document.title = 'Quotes - Dashboard';
  document.body.id = 'dashboard-page';
};
const onLogin = () => {
  document.title = 'Quotes - Login';
  document.body.id = 'login-page';
};
const onSignup = () => {
  document.title = 'Quotes - Signup';
  document.body.id = 'signup-page';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callbacks: any = {
  '/': [onHome],
  '/dashboard': [onDashboard],
  '/dashboard/users': [onDashboard],
  '/dashboard/users/add': [onDashboard],
  '/dashboard/users/edit': [onDashboard],

  '/login': [onLogin],
  '/signup': [onSignup],
  '*': [onDefault],
};

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || [];
  callbacks[_case].push(fn);
};

export const usePageIdentification = () => {
  const location = useLocation();

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn();
      });
    } else {
      onDefault();
    }
  };

  useEffect(() => {
    if (location.pathname) customSwitch(location.pathname);
  }, [location.pathname]);
};
