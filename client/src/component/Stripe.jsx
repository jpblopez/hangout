import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const PUBLIC_KEY =
  'pk_test_51Kg5oJLX95dC6FDinL5PxFRmMwu13oGUZrntXbWsPzxxFSn0S1Dh222IJeIU7rjDZlyqrspAVg38u1WHmcjpCgKE00rFbbnXwt';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function Stripe() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Payment />
    </Elements>
  );
}

export default Stripe;
