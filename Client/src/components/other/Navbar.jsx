import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data?.category.toLowerCase() == cat.toLowerCase(),
      ),
    );
  };

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data?.price >= price));
  };
  const navigate = useNavigate();
  const location = useLocation();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="nav ">
        <div className="nav_bar ">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3 className="brand-logo">
              <span className="material-symbols-outlined me-2">
                shopping_bag
              </span>
              UrbanMart
            </h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);

                // Live filtering only on home page
                if (location.pathname === "/") {
                  if (value === "") {
                    setFilteredData(products);
                  } else {
                    const filtered = products.filter((product) =>
                      product.title.toLowerCase().includes(value.toLowerCase()),
                    );
                    setFilteredData(filtered);
                  }
                }
              }}
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <div className="nav-icon">
                  <Link
                    to={"/cart"}
                    type="button"
                    className="btn btn-primary position-relative mx-3"
                  >
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                    {cart?.items?.length != 0 && (
                      <>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart?.items?.length}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </>
                    )}
                  </Link>
                </div>
                <div className="nav-icon">
                  <Link to={"/profile"} className="btn btn-info mx-3">
                    <span className="material-symbols-outlined">person</span>
                  </Link>
                  <span className="nav-tooltip">Profile</span>
                </div>

                <div className="nav-icon">
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                  <span className="nav-tooltip">Logout</span>
                </div>

                <div className="nav-icon">
                  <Link to={"/login"} className="btn btn-secondary mx-3">
                    <span className="material-symbols-outlined">login</span>
                  </Link>
                  <span className="nav-tooltip">Login</span>
                </div>

                <div className="nav-icon">
                  <Link to={"/register"} className="btn btn-info mx-3">
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </Link>
                  <span className="nav-tooltip">Register</span>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>

                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            {/* Category Filter */}
            <select
              className="filter_select"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setFilteredData(products);
                } else {
                  filterByCategory(value);
                }
              }}
            >
              <option value="">All Categories</option>
              <option value="mobile">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="camera">Camera</option>
              <option value="headphones">Headphones</option>
            </select>

            {/* Price Filter */}
            <select
              className="filter_select"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setFilteredData(products);
                } else {
                  filterByPrice(Number(value));
                }
              }}
            >
              <option value="">All Prices</option>
              <option value="15000">Above ₹15000</option>
              <option value="20000">Above ₹20000</option>
              <option value="30000">Above ₹30000</option>
              <option value="60000">Above ₹60000</option>
            </select>

            {/* Sort Filter */}
            <select
              className="filter_select"
              onChange={(e) => {
                const value = e.target.value;

                if (value === "low") {
                  setFilteredData(
                    [...products].sort((a, b) => a.price - b.price),
                  );
                }

                if (value === "high") {
                  setFilteredData(
                    [...products].sort((a, b) => b.price - a.price),
                  );
                }
              }}
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
