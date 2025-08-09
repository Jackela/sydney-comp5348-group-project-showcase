/**
 * Custom App component for Next.js
 * @module _app
 */

import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../store/Store';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

/**
 * Custom App component that wraps the entire application
 * @param {AppProps} props - The props passed to the App component
 * @returns {JSX.Element} The rendered App component
 */
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);