import React from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState();
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [userOrder, setUserOrder] = useState([]);

  //fetchproduct useEffect
  useEffect(() => {
    // if (!token) return;
    const fetchproduct = async () => {
      const api = await axios.get(`${url}/product/showAll`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchproduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);
  console.log("the token is ", token);
  //token useEffect

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setisAuthenticated(true);
    }

    // get token is used to save the previous token in the state again as token is stored in local storage after setItem in local storage but gets lost in state after refresh getItem helps in storing in the state
  }, []);

  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    toast.success("🦄" + api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api;
  };
  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    toast.success("🦄" + api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    console.log("user login", api.data);
    setToken(api.data.token);
    setisAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    console.log("the token is", token);
    return api;
  };

  //logout user

  const logout = () => {
    setisAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log(api.data.products);
    setUser(api.data.user);
    console.log("The user profile is", api.data);
  };

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log("my cart", api);
  };

  //user cart

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/find`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    console.log("user cart ", api.data.cart);
    setCart(api.data.cart);
  };

  //decrease quantity

  const decreaseQuantity = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty `,
      {
        productId,
        qty,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );

    // console.log("user cart ", api.data.cart);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // remove full item
  const removeItem = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId} `,

      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    console.log("remove item from the cart", api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //clear the cart

  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear `,

      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    console.log("remove item from the cart", api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  //Add shipping address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      {
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    console.log("the address api is", api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api;
  };

  //get user address

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("user address is", api);
    setUserAddress(api.data.userAddress);
  };

  //get specific order
  const user_Order = async () => {
    console.log("Calling userOrder API...");

    try {
      const api = await axios.get(`${url}/payment/userorder`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      console.log("API Response for the user order is:", api.data);
      setUserOrder(api?.data?.orders);
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          products,
          register,
          login,
          url,
          setisAuthenticated,
          isAuthenticated,
          filteredData,
          setFilteredData,
          logout,
          user,
          addToCart,
          cart,
          decreaseQuantity,
          removeItem,
          clearCart,
          shippingAddress,
          userAddress,
          userOrder,
          setReload,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppState;
