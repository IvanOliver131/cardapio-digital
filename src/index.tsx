import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import Router from './routes';
import { CartProvider } from 'context/CartContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductsProvider } from 'context/ProductsContext';

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <ToastContainer autoClose={3000} />
        <Router />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
