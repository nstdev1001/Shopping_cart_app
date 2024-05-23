import { Fragment } from "react";
import { Link } from "react-router-dom";
import shopLogo from "../../public/shopping-bag.gif";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { CartSate } from "../reducers/cartSlice";
import { WishListState } from "../reducers/wishListSlice";
import Tooltip from "@mui/material/Tooltip";

const NavBar = () => {
  const { cartItems } = useSelector((state: CartSate) => state.cart);
  const { wishListItems } = useSelector(
    (state: WishListState) => state.wishList
  );
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container col-11 px-0 d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/">
            <a className="navbar-brand" href="#">
              <img className="logo" src={shopLogo} alt="Logo" height="30" />
              The Interiors
            </a>
          </Link>
          <div className="cart-and-wishlist-wrapper">
            <Tooltip title="Your wish list" placement="left">
              <Link to="/wishlist">
                <a className="navbar-brand" href="#">
                  <Badge badgeContent={wishListItems.length} color="warning">
                    <i
                      className="fa-solid fa-heart"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </Badge>
                </a>
              </Link>
            </Tooltip>

            <Tooltip title="Your cart" placement="right">
              <Link to="/cart">
                <a
                  className="navbar-brand"
                  href="#"
                  style={{ marginRight: "20px" }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </Badge>
                </a>
              </Link>
            </Tooltip>
          </div>
          {/* /Logo */}
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
