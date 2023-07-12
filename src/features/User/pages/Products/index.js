import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination";
import {
  OPTIONS_COLOR,
  OPTION_GENDER,
  OPTION_SIZE,
  OPTION_TYPE,
} from "../../../../constants/global";
import {
  getAllBrand,
  removeStateBranch,
} from "../../../Admin/pages/ManagementBrand/BrandSlice";
import { getProduct, removeStateProduct } from "./ProductSlice";
import "./Products.scss";
import {
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ProductItem from "./ProductItem";
import SearchIcon from "@mui/icons-material/Search";
import { getAllFavorites } from "./ProductItem/FavoriteSlice";

function Products() {
  const products = useSelector((state) => state.product.products?.product);
  const count = useSelector((state) => state.product.products?.count);
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  const favorites = useSelector((state) => state.favorite.favorites);
  const [brandOption, setBrandOption] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [valueSort, setValueSort] = useState("");
  const [pageNumber, setPageNumber] = useState(12);
  const [search, setSearch] = useState("");
  const [param, setParam] = useState({
    type: [],
    brand: [],
    color: [],
    size: [],
    gender: [],
  });
  const dispatch = useDispatch();

  const handleChangeSort = useCallback(
    (e) => {
      let listCopy = [...products];
      listCopy.sort((a, b) => {
        return (a.price - b.price) * Number(e?.target?.value);
      });
      setListProduct(listCopy);
      setValueSort(e?.target?.value);
    },
    [products]
  );

  const handleChangeFilter = useCallback(
    async (typeFilter, isChecked, label) => {
      let paramCopy = { ...param };
      if (isChecked) {
        paramCopy[typeFilter].push(label);
      } else {
        paramCopy[typeFilter] = paramCopy[typeFilter].filter(
          (element) => element !== label
        );
      }
      setParam(paramCopy);
    },
    [param]
  );

  const handleSearch = useCallback(() => {
    setParam({ ...param, search: search });
  }, [param, search]);

  const handleOnkeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setParam({ ...param, search: search });
      }
    },
    [param, search]
  );

  const handleChangePageNumber = useCallback((value) => {
    setPageNumber(value);
    setPage(1);
  }, []);

  const isLike = (id) => {
    const check = favorites?.find((item) => {
      return item._id === id;
    });
    if (check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getProduct({ page: page, pageSize: pageNumber, ...param }));

    return () => {
      dispatch(removeStateProduct());
    };
  }, [dispatch, pageNumber, page, param]);

  useEffect(() => {
    dispatch(getAllFavorites());
    dispatch(getAllBrand());
    return () => {
      dispatch(removeStateBranch());
    };
  }, [dispatch]);

  useEffect(() => {
    if (brand && brand.length > 0) {
      const brandItems = brand?.map((brandItem) => {
        return { value: brandItem._id, label: brandItem.name };
      });
      setBrandOption(brandItems);
    }
  }, [brand]);

  useEffect(() => {
    setListProduct(products);
  }, [products]);

  return (
    <div id="product">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="input-with-icon-textfield"
                className="search-product"
                placeholder="Tìm kiếm"
                onKeyDown={handleOnkeyDown}
                onChange={(e) => setSearch(e?.target?.value)}
                value={search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon onClick={handleSearch} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={valueSort}
                onChange={handleChangeSort}
                displayEmpty
                className="sort-product"
                renderValue={
                  valueSort !== ""
                    ? undefined
                    : () => (
                        <span
                          style={{
                            color: "#A2A2A2",
                            fontWeight: "200",
                            fontSize: "14px",
                          }}
                        >
                          Sắp xếp theo
                        </span>
                      )
                }
                variant="standard"
              >
                <MenuItem value={1}>Giá tăng dần</MenuItem>
                <MenuItem value={-1}>Giá giảm dần</MenuItem>
              </Select>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container xs={2}>
            <div>
              <div className="category filter">
                <span className="title">Danh mục</span>
                {OPTION_TYPE.map((typeItem, index) => {
                  return (
                    <div className="item" key={index}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={typeItem.value}
                        onChange={(e) =>
                          handleChangeFilter(
                            "type",
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label>{typeItem.label}</label>
                    </div>
                  );
                })}
              </div>
              <div className="category filter">
                <span className="title">Giới tính</span>
                {OPTION_GENDER.map((gender, index) => {
                  return (
                    <div className="item" key={index}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={gender.value}
                        onChange={(e) =>
                          handleChangeFilter(
                            "gender",
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label>{gender.label}</label>
                    </div>
                  );
                })}
              </div>
              <div className="brand filter">
                <span className="title">Nhãn hiệu</span>
                {brandOption &&
                  brandOption.map((brandItem, index) => {
                    return (
                      <div className="item" key={index}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={brandItem.label}
                          onChange={(e) =>
                            handleChangeFilter(
                              "brand",
                              e.target.checked,
                              e.target.value
                            )
                          }
                        />
                        <label>{brandItem.label}</label>
                      </div>
                    );
                  })}
              </div>
              <div className="category filter">
                <span className="title">Màu sắc</span>
                {OPTIONS_COLOR.map((colorItem, index) => {
                  return (
                    <div className="item" key={index}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={colorItem.label}
                        onChange={(e) =>
                          handleChangeFilter(
                            "color",
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label>{colorItem.label}</label>
                    </div>
                  );
                })}
              </div>
              <div className="category filter">
                <span className="title">Màu sắc</span>
                {OPTION_SIZE.map((sizeItem, index) => {
                  return (
                    <div className="item" key={index}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={sizeItem.value}
                        onChange={(e) =>
                          handleChangeFilter(
                            "size",
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label>{sizeItem.label}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
          <Grid item container xs={10} spacing={1}>
            {listProduct &&
              listProduct.length > 0 &&
              listProduct.map((product) => {
                return (
                  <Grid item xs={3} key={product._id}>
                    <ProductItem
                      product={product}
                      isLike={isLike(product._id)}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Pagination
              page={page}
              count={count}
              pageNumber={pageNumber}
              handlePageClick={(e) => setPage(e.selected + 1)}
              handleChangePageNumber={(value) => handleChangePageNumber(value)}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Products;
