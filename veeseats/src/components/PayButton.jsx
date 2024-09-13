import React from 'react';
import { PaystackButton } from 'react-paystack';

const PayButton = ({ amount, publicKey, setReference, handlePrint }) => {
  // Configuration for Paystack
  const config = {
    email: "user@example.com", // Change to the user's email dynamically if needed
    amount: amount * 100,      // Amount in Kobo (smallest unit of currency)
    publicKey: publicKey,      // Your Paystack public key
  };

  // Callback when payment is successful
  const onSuccess = (reference) => {
    console.log("Payment successful!", reference); // Reference returned from Paystack
    setReference(reference);                       // Store the reference (optional)
    handlePrint(reference);                        // Custom function for handling success (optional)
  };

  // Callback when the payment dialog is closed
  const onClose = () => {
    alert("Wait! You need this, don't go!!!!");    // Customize the close message
  };

  // Custom button configuration (optional)
  const componentProps = {
    ...config,
    text: "Pay Now",      // Button text
    onSuccess,            // Success callback
    onClose,              // Close callback
  };

  return <PaystackButton {...componentProps} />;
};

export default PayButton;
