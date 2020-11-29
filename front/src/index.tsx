import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore.dev'; //todo: fix for production mode
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

const persistedState = localStorage.getItem('WSS') //use local storage just to save token
  ? JSON.parse(localStorage.getItem('WSS'))
  : {};

const store = configureStore(persistedState);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'WSS',
    JSON.stringify({
      Account: state.Account,
    })
  );
});

const Toast = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    transition={Slide}
    hideProgressBar={false}
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    closeOnClick
    limit={3}
  />
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
