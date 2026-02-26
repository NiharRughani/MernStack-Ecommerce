import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, decreaseQuantity, addToCart, removeItem, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
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

  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
          <div className="text-center my-5">
            <button
              className="btn btn-warning mx-3"
              onClick={() => navigate("/")}
            >
              Continue Shopping..
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cart-summary container my-4 p-4">
            <button className="btn btn-info mx-3">Total Qty:-{qty}</button>
            <button className="btn btn-warning mx-3">
              Total Price :-{price}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark my-5 p-3 text-center"
        >
          <div>
            <div className="cart_img">
              <img src={product.imgSrc} alt="" />
            </div>
            <div className="cart_des">
              <h5 className="cart-title">{product.title}</h5>
              <h6 className="cart-price">₹ {product.price}</h6>
              <h6 className="cart-qty">Qty: {product.qty}</h6>

              <div className="cart_action">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => {
                      decreaseQuantity(product.productId, 1);
                    }}
                  >
                    -
                  </button>

                  <span className="qty-number">{product.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc,
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => {
                    if (confirm("Do you want to remove this item?")) {
                      removeItem(product?.productId);
                    }
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {cart?.items.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3 "
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3 "
            onClick={() => {
              if (confirm("Do You Want To Clear The Cart ?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
