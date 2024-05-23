import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../reducers/productSlice";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import stylesBtn from "../styles/quantity-btn.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartSlice";
import { Checkbox, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addToWishList, removeFromWishList } from "../reducers/wishListSlice";
import ColorPicker from "./ColorPicker";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import SizePicker from "./SizePicker";
import ProductsServices from "../sever-interaction/ProductsServices";

const ProductsDetail = () => {
  // const [color, setColor] = useState("Alabster White");
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedColor = useSelector((state: RootState) => state.color);
  const selectedSize = useSelector((state: RootState) => state.size);
  console.log("selectedColor in productDetail: ", selectedColor);
  console.log("selectedSize in productDetail: ", selectedSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await ProductsServices.getProduct(id);
          setProductDetail(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleDecreaseProduct = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseProduct = () => {
    if (quantity < 99) {
      setQuantity((prev) => prev + 1);
    }
  };

  console.log("productDetail: ", productDetail);

  const handleAddToCart = () => {
    if (productDetail) {
      dispatch(
        addToCart({ ...productDetail, quantity, selectedColor, selectedSize })
      );

      // Make a POST request to the API endpoint to add the product to the cart
      // fetch("http://localhost:8888/cart", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ ...productDetail, quantity, color, size }),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Failed to add product to cart");
      //     }

      //     console.log("Product added to cart successfully");
      //   })
      //   .catch((error) => {
      //     console.error("Error adding product to cart:", error.message);
      //   });
    }
  };

  const [checked, setChecked] = useState(false);
  console.log("checked", checked);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    product: any
  ) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      dispatch(addToWishList({ ...product, checked: true }));
    } else {
      dispatch(removeFromWishList(product));
    }
  };

  return (
    <div className="container products_container">
      <Button variant="plain" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left fs-4"></i>
      </Button>
      <div className="row mt-3 detail_product_container">
        <div className="col-lg-6 col-md-12 col-12">
          <img
            className="image_detail_product"
            src={productDetail?.image}
            alt={productDetail?.name}
          />
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <h4 className="name_product">
            <span className="flex-container d-flex justify-content-between align-items-center">
              <span className="name_product">{productDetail?.name}</span>
              <span className="checkbox-wrapper">
                <Tooltip title="Add to wishlish" placement="top">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    value={checked}
                    onChange={(event) =>
                      handleCheckboxChange(event, productDetail)
                    }
                  />
                </Tooltip>
              </span>
            </span>
          </h4>

          <p style={{ color: "orange" }}>
            $
            <strong>{`${(productDetail?.price ?? 0 / 100).toFixed(2)}`}</strong>
          </p>
          <p>{productDetail?.description}</p>
          <div className="shipping_detait row">
            <p>
              <strong>Shipping: Free</strong>
            </p>
            <p>
              <strong>Category: </strong>
              {productDetail?.category}
            </p>
            <p>
              <strong>Brand: </strong>
              {productDetail?.company}
            </p>
            <p>
              <strong>Color: </strong> {selectedColor.name}
            </p>
            <p>
              <strong>Size: </strong> {selectedSize.size}
            </p>
          </div>

          {/* choose color */}
          <div className="customize_product">
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <ColorPicker />
              </FormControl>
              <FormControl>
                <FormLabel>Size</FormLabel>
                <SizePicker />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <div className="d-flex justify-content-between">
                  <div className={`d-inline-block`}>
                    <div
                      className={` ${stylesBtn.button_quantity_group} container text-center`}
                    >
                      <span
                        className={stylesBtn.decrease_btn}
                        onClick={handleDecreaseProduct}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </span>
                      <span className={stylesBtn.number}>{quantity}</span>
                      <span
                        className={stylesBtn.increase_btn}
                        onClick={handleIncreaseProduct}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormControl>
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </FormControl>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
