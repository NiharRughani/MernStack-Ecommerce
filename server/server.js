import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";

import cartRouter from "./Routes/cartRouter.js";

import addressRouter from "./Routes/addressRouter.js";

import paymentRouter from "./Routes/paymentRouter.js";

const app = express();

const port = 1000;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//userrouter

app.use("/api/user", userRouter);

//Productrouter

app.use("/api/product", productRouter);

//cartrouter

app.use("/api/cart", cartRouter);

//addressrouter

app.use("/api/address", addressRouter);

app.use("/api/payment", paymentRouter);

mongoose
  .connect(
    "mongodb+srv://niharrughani30_db_user:database1@cluster0.immgjwi.mongodb.net/",
    { dbName: "MERN_PROJECT" },
  )
  .then(() => {
    console.log("mongoDb connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is started url is http://localhost:${port}`);
});
