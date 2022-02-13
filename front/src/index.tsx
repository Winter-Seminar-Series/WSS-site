import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './i18n';
import configureStore from './redux/store/configureStore'; //todo: fix for production mode

const persistedState = localStorage.getItem('WSS') //use local storage just to save token
  ? JSON.parse(localStorage.getItem('WSS'))
  : {};

const store = configureStore(persistedState);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'WSS',
    JSON.stringify({
      account: state.account,
    })
  );
});

const Toast = () => (
  <ToastContainer
    position="top-right"
    autoClose={4000}
    transition={Slide}
    hideProgressBar={false}
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    closeOnClick
    limit={3}
  />
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toast />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
