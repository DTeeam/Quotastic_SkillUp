import React from 'react';
import './styles/App.css';
import { usePageIdentification } from 'hooks/usePageIdentification';
import Routes from 'routes/Routes';
import { observer } from 'mobx-react';
import LoginForm from 'components/user/LoginForm';

function App() {
  usePageIdentification();
  return <LoginForm />;
}

export default observer(App);
