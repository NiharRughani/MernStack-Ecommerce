import React from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const url = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState();
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchproduct = async () => {
      const api = await axios.get(`${url}/product/showAll`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchproduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setisAuthenticated(true);
    }
  }, []);

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
    toast.success("🦄" + api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
    return api;
  };

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
    toast.success("🦄" + api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
    setToken(api.data.token);
    setisAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api;
  };

  const logout = () => {
    setisAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
  };

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: { "Content-Type": "application/json", Auth: token },
      withCredentials: true,
    });
    setUser(api.data.user);
  };

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
  };

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/find`, {
      headers: { "Content-Type": "application/json", Auth: token },
      withCredentials: true,
    });
    setCart(api.data.cart);
  };

  const decreaseQuantity = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
  };

  const removeItem = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId}`,
      {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
  };

  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear`,
      {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
  };

  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right", autoClose: 1500, hideProgressBar: false,
      closeOnClick: false, pauseOnHover: true, draggable: true,
      theme: "dark", transition: Bounce,
    });
    return api;
  };

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: { "Content-Type": "application/json", Auth: token },
      withCredentials: true,
    });
    setUserAddress(api.data.userAddress);
  };

  const user_Order = async () => {
    try {
      const api = await axios.get(`${url}/payment/userorder`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setUserOrder(api?.data?.orders);
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          products, register, login, url,
          setisAuthenticated, isAuthenticated,
          filteredData, setFilteredData,
          logout, user, addToCart, cart,
          decreaseQuantity, removeItem, clearCart,
          shippingAddress, userAddress, userOrder, setReload,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppState;
