import React from 'react';
import { PaystackButton } from 'react-paystack';

const PayWithPaystack = ({ amount, email, onSuccessfunc, setpaymentref }) => {
    const publicKey = 'pk_test_5cff1482a437c3feb9114d509f327eda9366d37e'; // Replace with your Paystack public key


  const componentProps = {
    email: email,  // Customer's email
    amount: amount * 100,  // Paystack expects amount in kobo (multiply by 100 to convert Naira to Kobo)
    publicKey: publicKey,
    text: 'Pay Now',  // Button text
    onSuccess: (response) => {
      console.log(response.reference); 
      setpaymentref(response.reference);       // Logs the success response from Paystack
    //   onSuccessfunc(response.reference);  // Calls the function passed as a prop on successful payment
    },
    onClose: () => {
      console.log('Payment closed');  // Logs when the user closes the payment window
    },
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PayWithPaystack;
