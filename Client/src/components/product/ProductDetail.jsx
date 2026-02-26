import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
const ProductDetail = () => {
  const { id } = useParams();
  const url = " http://localhost:1000/api";

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchproduct = async () => {
      const api = await axios.get(`${url}/product/find/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setProduct(api.data.product);

      // console.log(products);
    };
    fetchproduct();
  }, [id]);
  console.log(product, "this is product");
  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>{product?.price} ₹</h1>
          <div className="my-5 ">
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: "bold" }}
            >
              Buy Now
            </button>
            <button className="btn btn-warning" style={{ fontWeight: "bold" }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
