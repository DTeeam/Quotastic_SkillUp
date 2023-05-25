import React from 'react';
import './styles/App.css';
import { usePageIdentification } from 'hooks/usePageIdentification';
import Routes from 'routes/Routes';
import { observer } from 'mobx-react';

function App() {
  usePageIdentification();
  return <Routes />;
}

export default observer(App);
