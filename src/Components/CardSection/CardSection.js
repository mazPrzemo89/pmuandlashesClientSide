import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import styles from './CardSectionStyles.module.css'

const CARD_ELEMENT_OPTIONS = {
    hidePostalCode:true,
    placeholder:'Name',
    style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <label>
      <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.StripeElement} />
    </label>
  );
};

export default CardSection;