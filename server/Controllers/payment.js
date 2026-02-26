import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
const razorpay = new Razorpay({
  key_id: "rzp_test_SGpCmIPp66ng5N",
  key_secret: "n7RqPSHLo1eZo03Nho5LJ0cg",
});

export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // Amount is in currency subunits.
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });
  res.json({ message: "payment successfull", success: true, orderConfirm });
};

//user specific order

export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();

  let orders = await Payment.find({ userId: userId }).sort({ _id: -1 }); // descending order
  res.json({ orders });
  console.log("req.user is", req.user);
};

//all orders

export const allOrder = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 }); // descending order

  res.json({ orders });
};
