import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { STRIPE } from './config'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(STRIPE);


const store = createStore(reducer)


ReactDOM.render(<Provider store={store}><Elements stripe={stripePromise}><Routes /></Elements></Provider> , document.getElementById('root'));

