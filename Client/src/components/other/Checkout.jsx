import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";

import axios from "axios";

import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart, userAddress, url, user, clearCart, setReload } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  console.log(userAddress);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
      console.log("order response is", orderResponse);

      const { orderId, amount: orderAmount } = orderResponse.data;

      var options = {
        key: "rzp_test_SGpCmIPp66ng5N", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits.
        currency: "INR",
        name: "Nihar Rughani",
        description: "Test Transaction",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData,
          );
          if (api.data?.success) {
            clearCart();
            setReload((prev) => !prev); // 🔥 trigger refresh
            navigate("/orderconfirmation");
          }

          console.log("payment data is", api);
        },
        prefill: {
          name: "Nihar Rughani",
          email: "niharrughani30@gmail.com",
          contact: "+919876543210",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        <div className="checkout-container container my-5">
          <div className="checkout-left">
            <TableProduct cart={cart} />
          </div>

          <div className="checkout-right">
            <h4>Shipping Address</h4>
            <ul>
              <li>
                <strong>Name:</strong> {userAddress?.fullName}
              </li>
              <li>
                <strong>Phone:</strong> {userAddress?.phoneNumber}
              </li>
              <li>
                <strong>Country:</strong> {userAddress?.country}
              </li>
              <li>
                <strong>State:</strong> {userAddress?.state}
              </li>
              <li>
                <strong>Pincode:</strong> {userAddress?.pincode}
              </li>
              <li>
                <strong>Address:</strong> {userAddress?.address}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
