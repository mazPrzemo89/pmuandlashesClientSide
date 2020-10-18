import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { getClientSecret } from '../../APIs/stripeApi'
import CardSection from '../CardSection/CardSection';
import styles from './CheckoutForm.module.css'

export default function CheckoutForm(props) {
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const [secret, setSecret] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    getClientSecret().then(data=>{
      if(data.error) {
          setError(data.error)
      } else {
        setSecret(data)
      }
  })
  
  },[])


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const result = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.refNumber,
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        dispatch({type:'SET_REFNR', value:props.refNumber})
        props.successFunciton()
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection  />
      <button disabled={!stripe} className={styles.payButton}>Confirm order</button>
    </form>
  );
}

