import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './config/Root';

const render = (Component) => {
  document.documentElement.style.height='100%';
  document.body.style.margin='0';
  document.body.style.height='100%';
  document.getElementById('root').style.backgroundColor='rgb(0, 121, 191)';
  document.getElementById('root').style.height='100%';
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
