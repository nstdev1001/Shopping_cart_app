import React, { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Product, setProducts } from "../reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import ProductsServices from "../sever-interaction/ProductsServices";
import { ProductListItemSkeleton } from "./Skeleton";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  // console.log(products);
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingOrder, setSortingOrder] = useState<string | null>("all");
  const [sortedProduct, setSortedProduct] = useState<Product[]>(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductsServices.getProducts();
        dispatch(setProducts(response));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleShowDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const sortProducts = (order: string) => {
    const sortCoppyProduct = [...products];

    if (order === "ascending") {
      sortCoppyProduct.sort((a, b) => a.price - b.price);
    } else if (order === "descending") {
      sortCoppyProduct.sort((a, b) => b.price - a.price);
    } else if (order === "descending") {
      return sortCoppyProduct;
    }

    setSortedProduct(sortCoppyProduct);
  };

  const handleSortChange = (event: SelectChangeEvent<string | null>) => {
    setSortingOrder(event.target.value);
    sortProducts(event.target.value as string);
  };

  // console.log("sortedProduct: ", sortedProduct);

  const filteredProducts = sortedProduct.filter((product) => {
    const isCategoryMatch =
      categoryFilter === "all" || product.category === categoryFilter;
    const isCompanyMatch =
      companyFilter === "all" || product.company === companyFilter;
    const isSearchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isCategoryMatch && isCompanyMatch && isSearchMatch;
  });

  // console.log("filteredProducts: ", filteredProducts);

  const [alignment, setAlignment] = React.useState<string>("window");

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  // console.log(alignment);

  const handleResetFilter = () => {
    setCategoryFilter("all");
    setCompanyFilter("all");
  };

  return (
    <Fragment>
      <div className="container product_page_container">
        <div className="row">
          <div className="col-md-3 col-sm-12 search_filter_container">
            <div className="col-md-12 col-12">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                className="mb-3"
                style={{ width: "100%" }}
              />
            </div>

            <div className="filter_wrapper row">
              <div className="col-md-12 col-6">
                <h4>Category</h4>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    name="company-radio-group"
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio size="small" />}
                      label="All"
                    />
                    <FormControlLabel
                      value="office"
                      control={<Radio size="small" />}
                      label="Office"
                    />
                    <FormControlLabel
                      value="living-room"
                      control={<Radio size="small" />}
                      label="Living room"
                    />
                    <FormControlLabel
                      value="kitchen"
                      control={<Radio size="small" />}
                      label="Kitchen"
                    />
                    <FormControlLabel
                      value="bedroom"
                      control={<Radio size="small" />}
                      label="Bedroom"
                    />
                    <FormControlLabel
                      value="dining"
                      control={<Radio size="small" />}
                      label="Dining"
                    />
                    <FormControlLabel
                      value="kids"
                      control={<Radio size="small" />}
                      label="Kids"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-12 col-6">
                <h4>Company</h4>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio size="small" />}
                      label="All"
                    />
                    <FormControlLabel
                      value="macros"
                      control={<Radio size="small" />}
                      label="Macros"
                    />
                    <FormControlLabel
                      value="liddy"
                      control={<Radio size="small" />}
                      label="Liddy"
                    />
                    <FormControlLabel
                      value="ikea"
                      control={<Radio size="small" />}
                      label="Ikea"
                    />
                    <FormControlLabel
                      value="caressa"
                      control={<Radio size="small" />}
                      label="Caressa"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <Button
              variant="outlined"
              color="error"
              className="mt-2"
              size="medium"
              onClick={handleResetFilter}
              style={{ width: "100%" }}
            >
              Clear All Filter
            </Button>
          </div>

          <div className="col-md-9 col-sm-12">
            <div className="display_type_bar ">
              <div className="btn_view_group ">
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton value="window" aria-label="left aligned">
                    <i className="fa-solid fa-border-all"></i>
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="centered">
                    <i className="fa-solid fa-bars"></i>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="product_quantity ">
                <strong>{filteredProducts.length}</strong> Products
              </div>
              <div className="sort_group">
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="sort"
                      id="sort"
                      value={sortingOrder}
                      label="Sort"
                      onChange={handleSortChange}
                      size="small"
                    >
                      <MenuItem value="all">Clear sort</MenuItem>
                      <MenuItem value="ascending">Price (Low to High)</MenuItem>
                      <MenuItem value="descending">
                        Price (High to Low)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            {/* products view */}
            <div className="row mt-3 product_list_wrapper">
              {/* <ProductListItemSkeleton key={1} alignment="list" /> */}
              {filteredProducts.length === 0
                ? Array.from({ length: 6 }).map((_, index) => (
                    <ProductListItemSkeleton
                      key={index}
                      alignment={alignment}
                    />
                  ))
                : filteredProducts.map((product, index) => (
                    <div
                      key={index}
                      className={
                        alignment === "list"
                          ? "col-12 border rounded p-2 m-2"
                          : "col-lg-4 col-sm-6 col-xs-12 rounded p-2"
                      }
                    >
                      {alignment === "list" ? (
                        <div className="row mt-2 mb-2">
                          <div className="col-6">
                            <img
                              className="image_list_view"
                              src={product.image}
                              alt={product.name}
                              onClick={() => handleShowDetail(product.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div className="col-6 p-0 pr-3">
                            <h4 className="name_product h5">
                              <strong>{product.name}</strong>
                            </h4>
                            <p style={{ color: "orange" }}>
                              $
                              <strong>{`${(product.price / 100).toFixed(
                                2
                              )}`}</strong>
                            </p>
                            <div className="shipping_detait row">
                              <p>
                                <strong>Category: </strong>
                                {product.category}
                              </p>
                              <p>
                                <strong>Brand: </strong>
                                {product.company}
                              </p>
                            </div>
                            <p className="description_list_view">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="each_product position-relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="image_window_view"
                            style={{
                              height: "150px",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => handleShowDetail(product.id)}
                          />
                          <div className="p-3">
                            <div className="d-flex align-items-center justify-content-between font-weight-bold">
                              <span className="name_product">
                                <strong>{product.name}</strong>
                              </span>
                              <span style={{ color: "orange" }}>
                                $
                                <strong>{`${(product.price / 100).toFixed(
                                  2
                                )}`}</strong>
                              </span>
                            </div>
                            <p className="mb-0">Category: {product.category}</p>
                            <p>Company: {product.company}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
