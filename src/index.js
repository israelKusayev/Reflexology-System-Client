import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './root';
import App from './App';

import './styles/mainStyles.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
