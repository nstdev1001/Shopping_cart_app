import { Fragment, useEffect } from "react";
import stylesBtn from "../styles/quantity-btn.module.css";
import { useSelector } from "react-redux";
import {
  CartItems,
  CartSate,
  decreaseQuantityInCart,
  deleteFromCart,
  getTotal,
  increaseQuantityInCart,
  resetCart,
} from "../reducers/cartSlice";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
import Swal from "sweetalert2";
import CheckoutProductService from "../sever-interaction/CheckoutProductService";

function formatCurrency(amount: number) {
  const amountString = amount.toString();
  const parts = amountString.split(".");
  const integerPart = parts[0];
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  const formattedAmount =
    parts.length > 1
      ? formattedIntegerPart + "." + parts[1]
      : formattedIntegerPart;
  return "$" + formattedAmount;
}

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: CartSate) => state.cart);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: CartSate) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
  });

  const handleDecreaseProduct = async (item: CartItems) => {
    dispatch(decreaseQuantityInCart(item));

    const updatedItem = { ...item, quantity: item.quantity - 1 };

    if (updatedItem.quantity === 0) {
      const confirmResult = await Swal.fire({
        title: "Do you want to delete this product?",
        text: "Your item will be remove from cart",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes",
      });

      if (confirmResult.isConfirmed) {
        dispatch(deleteFromCart(item));
      }
    }
  };

  const handleIncreaseProduct = (item: CartItems) => {
    dispatch(increaseQuantityInCart(item));
  };

  const handleDeleteProduct = (item: CartItems) => {
    dispatch(deleteFromCart(item));
    // console.log("item", item);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  // console.log("cart", cart);
  // console.log("cartItems: ", cartItems);

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Empty Cart",
          text: "You can't checkout because your cart is empty.",
        });
        return;
      }

      const confirmResult = await Swal.fire({
        title: "Do you want to purchase ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Checkout",
      });

      if (confirmResult.isConfirmed) {
        const checkoutData = {
          paySuccess: true,
          productsInOrder: cartItems.map((item: CartItems) => ({
            productName: item.name,
            productPrice: item.price,
            productBrand: item.company,
            productCategory: item.category,
            productColor: item.selectedColor,
            productSize: item.selectedSize,
            quantity: item.quantity,
            productTotalPrice: item.price * item.quantity,
          })),
        };

        const response = await CheckoutProductService.postCheckoutProduct(
          checkoutData
        );

        // console.log("Checkout successful!", response);
        dispatch(resetCart());

        const continueShopping = await Swal.fire({
          title: "Done!",
          text: "Continue shopping?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
          confirmButtonText: "Yes",
        });

        navigate(continueShopping.isConfirmed ? "/products" : "/cart");
      } else {
        // console.log("Checkout cancelled");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "An error occurred during checkout. Please try again later.",
      });
    }
  };
  return (
    <Fragment>
      <section
        className=""
        style={{
          backgroundColor: "#eee",
          marginTop: "20px",
          minHeight: "calc(100vh - 20px)",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7 ">
                      <h5 className="mb-3">
                        <a
                          className="text-body"
                          onClick={handleContinueShopping}
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          <i
                            className="fa-solid fa-arrow-left"
                            style={{ fontSize: "15px" }}
                          ></i>
                          <span
                            className=""
                            style={{ marginLeft: "10px", fontSize: "15px" }}
                          >
                            Continue shopping
                          </span>
                        </a>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h3 className="mb-1">Shopping cart</h3>
                          <p className="mb-0">
                            You have <strong>{cartItems.length}</strong> items
                            in your cart
                          </p>
                        </div>
                      </div>
                      {/* each product */}
                      <div className="cart_list_products">
                        {" "}
                        {cartItems.map((cartItem: CartItems) => (
                          <div
                            key={cartItem.id}
                            className="card mb-3"
                            style={{ height: "fit-content" }}
                          >
                            <div className="card-item row p-3">
                              <img
                                className="col-md-6 image_product_in_cart"
                                src={cartItem.image}
                                alt="this is image"
                                style={{
                                  height: "300px",
                                  maxWidth: "400px",
                                  objectFit: "cover",
                                  borderRadius: "15px",
                                  padding: "5px",
                                }}
                              />
                              <div className="col-md-6 col-6">
                                <h5
                                  className="m-1"
                                  style={{
                                    textTransform: "capitalize",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  {cartItem.name}
                                </h5>

                                <p
                                  className="m-1"
                                  style={{
                                    fontWeight: "bold",
                                    color: "#ffa500",
                                  }}
                                >
                                  {formatCurrency(cartItem.price)}
                                </p>
                                <p className="m-1">Brand: {cartItem.company}</p>
                                <p className="m-1">
                                  Category: {cartItem.category}
                                </p>
                                <div className="d-flex align-items-center">
                                  {" "}
                                  <span className="m-1">
                                    Color: {cartItem.selectedColor.name}
                                  </span>
                                  <span className="color-picker">
                                    <div
                                      className="color-circle"
                                      style={{
                                        backgroundColor:
                                          cartItem.selectedColor.code,
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    ></div>
                                  </span>
                                </div>

                                <p className="m-1">
                                  Size: {cartItem.selectedSize.size}
                                </p>
                                <div className="quantity_cast_total d-flex justify-content-between mt-5 border-bottom">
                                  <div className="d-flex justify-content-between bottom-0 mb-3">
                                    <div className={`d-inline-block`}>
                                      <div
                                        className={` ${stylesBtn.button_quantity_group} container text-center`}
                                      >
                                        <span
                                          className={stylesBtn.decrease_btn}
                                          onClick={() =>
                                            handleDecreaseProduct(cartItem)
                                          }
                                        >
                                          <i className="fa-solid fa-minus"></i>
                                        </span>
                                        <span className={stylesBtn.number}>
                                          {cartItem.quantity}
                                        </span>
                                        <span
                                          className={stylesBtn.increase_btn}
                                          onClick={() =>
                                            handleIncreaseProduct(cartItem)
                                          }
                                        >
                                          <i className="fa-solid fa-plus"></i>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="">
                                    <h5>
                                      {formatCurrency(
                                        cartItem.quantity * cartItem.price
                                      )}
                                    </h5>
                                  </span>
                                </div>
                                <div className="d-flex flex-column align-items-end mt-1">
                                  <Button
                                    variant="text"
                                    style={{
                                      width: "100%",
                                      backgroundColor: "ButtonShadow",
                                    }}
                                    onClick={() =>
                                      handleDeleteProduct(cartItem)
                                    }
                                  >
                                    <i
                                      className="fa-solid fa-trash"
                                      style={{
                                        color: "red",
                                        bottom: "20px",
                                        right: "20px",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                    ></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div
                        className="card text-white rounded-3"
                        style={{ backgroundColor: "#11477e" }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <i
                              className="fa-solid fa-circle-user"
                              style={{ fontSize: "40px" }}
                            ></i>
                          </div>
                          <p className="small mb-2">Card type</p>
                          <div>
                            <i
                              className="fa-brands fa-cc-visa fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <i
                              className="fa-brands fa-cc-mastercard fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <i
                              className="fa-brands fa-cc-paypal fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <i
                              className="fa-brands fa-cc-apple-pay fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <i
                              className="fa-regular fa-credit-card fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <i
                              className="fa-brands fa-cc-jcb fs-5"
                              style={{ marginRight: "10px" }}
                            ></i>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            {/* Card type icons */}
                          </div>
                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeName">
                                Cardholder's Name
                              </label>
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                placeholder="Cardholder's Name"
                                style={{
                                  fontSize: "15px",
                                  borderRadius: "20px",
                                }}
                              />
                            </div>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeText">
                                Card Number
                              </label>
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="1234 5678 9012 3457"
                                style={{
                                  fontSize: "15px",
                                  borderRadius: "20px",
                                }}
                              />
                            </div>
                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  {/* Expiration input */}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  {/* CVV input */}
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">
                              {" "}
                              {formatCurrency(cart.cartTotalAmount)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">
                              {cartItems.length !== 0 ? "$100" : "$0"}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <p className="mb-2" style={{ fontSize: "20px" }}>
                              Total(Incl. taxes)
                            </p>
                            <p
                              className="mb-2"
                              style={{ fontSize: "258x", fontWeight: "bold" }}
                            >{`${
                              cartItems.length !== 0
                                ? formatCurrency(cart.cartTotalAmount + 100)
                                : formatCurrency(cart.cartTotalAmount)
                            }`}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Button
                              variant="contained"
                              color="info"
                              style={{
                                width: "100%",
                                height: "50px",
                                fontSize: "18px",
                              }}
                              onClick={handleCheckout}
                            >
                              Checkout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CartPage;
