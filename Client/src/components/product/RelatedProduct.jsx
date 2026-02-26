import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [RelatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter((data) => {
        return data?.category.toLowerCase() == category?.toLowerCase();
      }),
    );
  }, [category, products]);
  return (
    <>
      {RelatedProduct?.length > 0 && (
        <div className="container related-section my-5">
          <h3 className="related-heading text-center">Related Products</h3>

          <div className="row justify-content-center my-4">
            {RelatedProduct?.map((product) => (
              <div
                key={product._id}
                className="col-md-4 col-lg-3 d-flex justify-content-center my-3"
              >
                <div className="card bg-dark text-light text-center">
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top"
                      alt={product.title}
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>

                    <div className="card-footer-section">
                      <h5 className="product-price">₹ {product.price}</h5>

                      <button className="btn btn-warning">
                        <span className="material-symbols-outlined me-1">
                          shopping_cart
                        </span>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProduct;
