import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import { Route } from 'react-router-dom';

const store = configure();

const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path="/" component={App}/>
      </HashRouter>
    </Provider>
  );
}

export default Root;