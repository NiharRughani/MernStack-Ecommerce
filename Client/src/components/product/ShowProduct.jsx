import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);
  return (
    <>
      <div className="container   ">
        <div className="row   justify-content-center  my-5 g-4">
          {filteredData?.map((product) => (
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

export default ShowProduct;
