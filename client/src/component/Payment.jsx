import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import image from '../summer.jpg';

function Payment() {
  const [success, setSuccess] = useState(false);
  const [lodging, setLodging] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();

  const getLodging = async () => {
    const lodging = await api.get(`/v1/lodging/${params.id}`);
    setLodging(lodging.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await api.post(`/v1/lodging/${params.id}/rent`, {
          amount: lodging.rate * 100,
          id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLodging();
  }, []);
  return (
    <div className="min-h-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl mx-auto text-center">
        <div className=" pt-5 ">
          <img className="w-auto mx-auto" src={image} alt="didnt load" />
          <p className="text-4xl">{lodging.title}</p>
          <p className="pb-4 text-xl">
            You are about to pay PHP{lodging.rate} for this listing
          </p>
        </div>
        {!success ? (
          <form
            className="border border-black relative mt-4 bg-white shadow-md sm:rounded-lg text-left"
            onSubmit={handleSubmit}
          >
            <div className="mt-5 pb-5 px-6 w-96 h-auto">
              <fieldset>
                <div>
                  <CardElement />
                </div>
              </fieldset>
              <button className="mt-4 border border-black px-5 py-1">
                Pay
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2>Payment success</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
