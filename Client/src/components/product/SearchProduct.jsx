// import { useParams } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import AppContext from "../../context/AppContext";
// const SearchProduct = () => {
//   const { products } = useContext(AppContext);
//   const { term } = useParams();
//   // const [Filtered, setFiltered] = useState(null);
//   // const url = "http://localhost:1000/api";
//   // useEffect(() => {
//   //   const result = products?.filter((product) => {
//   //     console.log(product.title);
//   //     return product.title?.toLowerCase().includes(term?.toLowerCase());
//   //   });

//   //   setFiltered(result || []);
//   // }, [products, term]);

//   // console.log(products);
//   return (
//     <>
//       {products
//         ?.filter((product) =>
//           product.title.toLowerCase().includes(term?.toLowerCase()),
//         )
//         .map((item,idx) => {
//           return <h1 key={idx}>title matching is {item.title}</h1>;
//         })}
//       hello
//     </>
//   );
// };

// export default SearchProduct;

import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const { term } = useParams();
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    setSearchProduct(
      products.filter((data) => {
        return data?.title.toLowerCase().includes(term?.toLowerCase());
      }),
    );
  }, [term]);
  console.log(products);
  console.log("the term is", term);
  console.log(searchProduct);
  return (
    <>
      <div className="container   ">
        <div className="row  justify-content-center  my-5 g-4 ">
          {searchProduct?.map((product) => (
            <div
              key={product._id}
              className="my-3 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
            >
              <div className="card bg-dark text-light text-center">
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                  <div className="my-3">
                    <div className="card-footer-section">
                      <h5 className="product-price">₹ {product.price}</h5>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          addToCart(
                            product._id,
                            product.title,
                            product.price,
                            1,
                            product.imgSrc,
                          )
                        }
                      >
                        <span className="material-symbols-outlined me-1">
                          shopping_cart
                        </span>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
