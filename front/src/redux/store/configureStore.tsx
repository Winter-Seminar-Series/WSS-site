import React from 'react'
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

const configureStore = (preloadedState) => {
  if (process.env.NODE_ENV === 'production') {
    return configureStoreProd(preloadedState);
  } else {
    return configureStoreDev(preloadedState);
  }
}

export default configureStore;