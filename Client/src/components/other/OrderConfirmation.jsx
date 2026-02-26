import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "./showOrderProduct";
import { useNavigate } from "react-router-dom";
const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState();
  useEffect(() => {
    setLatestOrder(userOrder?.[0]);
  }, [userOrder]);
  const navigate = useNavigate();
  console.log("the latest order is ", latestOrder);
  return (
    <>
      <div className="order-success container my-5 text-center">
        <span className="material-symbols-outlined success-icon">
          check_circle
        </span>

        <h2>Order Confirmed </h2>

        <p>Your order has been placed successfully.</p>

        <div className="order-meta">
          <p>
            <strong>Order ID:</strong> {latestOrder?.orderId}
          </p>
          <p>
            <strong>Payment ID:</strong> {latestOrder?.paymentId}
          </p>
        </div>
      </div>

      <div className="container ">
        <div className="order-summary container my-4">
          <div className="order-items-section">
            <h4>Items Ordered</h4>
            <ShowOrderProduct items={latestOrder?.orderItems} />
          </div>

          <div className="order-shipping-section">
            <h4>Shipping Details</h4>
            <ul>
              <li>
                <strong>Name:</strong> {latestOrder?.userShipping?.fullName}
              </li>
              <li>
                <strong>Phone:</strong> {latestOrder?.userShipping?.phoneNumber}
              </li>
              <li>
                <strong>State:</strong> {latestOrder?.userShipping?.state}
              </li>
              <li>
                <strong>Pincode:</strong> {latestOrder?.userShipping?.pincode}
              </li>
              <li>
                <strong>Address:</strong> {latestOrder?.userShipping?.address}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container text-center my-5">
        <button className="btn btn-warning mt-4" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default OrderConfirmation;
