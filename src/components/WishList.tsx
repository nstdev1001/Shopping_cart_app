import { Button, Checkbox, Tooltip } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import {
  WishListItems,
  WishListState,
  removeFromWishList,
  toggleWishlistItemChecked,
} from "../reducers/wishListSlice";
import { useDispatch } from "react-redux";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishListItems } = useSelector(
    (state: WishListState) => state.wishList
  );

  // console.log("wishListItems at wish list tsx: ", wishListItems);

  const handleShowDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleToggleChecked = (item: WishListItems) => {
    dispatch(toggleWishlistItemChecked(item));
    if (item.checked) {
      dispatch(removeFromWishList(item));
    }
  };

  return (
    <Fragment>
      <section
        className=""
        style={{
          backgroundColor: "#eee",

          height: "calc(100vh)",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card-body p-4">
              <div className="row">
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
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-1">Your wish list</h3>
                    <p>
                      You have <strong>{wishListItems.length}</strong> items in
                      wish lish
                    </p>
                  </div>
                </div>
                {/* each product */}
                {wishListItems.map((wishListItem: WishListItems) => (
                  <div key={wishListItems.id} className="col-md-6 col-12 mt-4">
                    <div
                      className="each_product"
                      style={{
                        backgroundColor: "white",
                        height: "fit-content",
                      }}
                    >
                      <img
                        src={wishListItem.image}
                        alt=""
                        className="image_window_view"
                        style={{
                          height: "300px",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShowDetail(wishListItem.id)}
                      />
                      <div className="p-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="name_product">
                            <strong className="h5 fw-bold">
                              {wishListItem.name}
                            </strong>
                          </span>
                          <span
                            className="h5"
                            style={{ color: "orange", marginBottom: "0" }}
                          >
                            $
                            <strong>{`${(wishListItem.price / 100).toFixed(
                              2
                            )}`}</strong>
                          </span>
                        </div>
                        <p className="mb-0">
                          Category: {wishListItem.category}
                        </p>
                        <p>Company: {wishListItem.company}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <Tooltip
                            title="Remove from wish lish"
                            placement="right"
                          >
                            <Checkbox
                              checked={wishListItem.checked}
                              // checked={true}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                              onChange={() => handleToggleChecked(wishListItem)}
                            />
                          </Tooltip>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleShowDetail(wishListItem.id)}
                          >
                            View details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default WishList;
