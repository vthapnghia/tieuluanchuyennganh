import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Icons from "../../../../components/Icons";
import Pagination from "../../../../components/Pagination";
import {
  COLOR,
  OPTIONS_COLOR,
  OPTION_GENDER,
  OPTION_SIZE,
  OPTION_TYPE,
  SORT_OPTION,
} from "../../../../constants/global";
import { getAllBrand } from "../../../Admin/pages/ManagementBrand/BrandSlice";
import { getProduct, searchProduct } from "./ProductSlice";
import "./Products.scss";
import { empty } from "../../../../assets/img";
import { currencyFormatting } from "../../../../until/common";
import PATH from "../../../../constants/path";
import { Link } from "react-router-dom";

function Products() {
  const { t } = useTranslation();
  const products = useSelector((state) => state.product.products?.product);
  const count = useSelector((state) => state.product.products?.count);
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  const [brandOption, setBrandOption] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(5);
  const [param, setParam] = useState({
    type: [],
    brand: [],
    color: [],
    size: [],
    gender: [],
  });
  const dispatch = useDispatch();
  const ref = useRef();

  const defaultStyles = useMemo(
    () => ({
      container: (styles) => ({
        ...styles,
        height: "58px",
      }),
      control: (styles) => ({
        ...styles,
        backgroundColor: COLOR.WHITE,
        width: "100%",
        borderRadius: "10px",
        paddingRight: "10px",
        border: `1px solid #95a5a6`,
        minHeight: 44,
        fontSize: "16px",
        transition: "none",
        height: "100%",
        padding: "1rem 3rem",
        textAlign: "left",
      }),
      valueContainer: (styles) => ({
        ...styles,
        padding: "0",
      }),
      option: (styles, { isFocused }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? COLOR.PRIMARY : COLOR.WHITE,
          color: isFocused ? COLOR.WHITE : COLOR.BLACK,
          ":active": {
            ...styles[":active"],
            backgroundColor: COLOR.PRIMARY,
          },
          ":hover": {
            ...styles[":hover"],
            color: COLOR.WHITE,
          },
          display: "inline-block",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        };
      },
      menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
        border: "10px",
      }),
      menu: (styles) => ({
        ...styles,
        width: "100%",
        position: "absolute",
      }),
      singleValue: (styles) => ({
        ...styles,
        color: COLOR.BLACK,
      }),
    }),
    []
  );

  const handleChangeSort = useCallback(
    (e) => {
      let listCopy = [...products];
      setListProduct(
        listCopy.sort((a, b) => {
          return (a.price - b.price) * Number(e.value);
        })
      );
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
    dispatch(searchProduct(ref.current.value));
  }, [dispatch]);

  const handleOnkeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setParam({ ...param, search: e.target.value });
      }
    },
    [param]
  );

  const handleChangePageNumber = useCallback((value) => {
    setPageNumber(value);
    setPage(1);
  }, []);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct({ page: page, pageSize: pageNumber, ...param }));
  }, [dispatch, pageNumber, page, param]);

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

  return useMemo(
    () => (
      <div className="product-section">
        <div className="row">
          <div className="col col-md-3 col-xl-2 product-filter">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t("category")}</Accordion.Header>
                <Accordion.Body>
                  {OPTION_TYPE.map((typeItem, index) => {
                    return (
                      <div className="accordion-child" key={index}>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t("brand")}</Accordion.Header>
                <Accordion.Body>
                  {brandOption &&
                    brandOption.map((brandItem, index) => {
                      return (
                        <div className="accordion-child" key={index}>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t("color")}</Accordion.Header>
                <Accordion.Body>
                  {OPTIONS_COLOR.map((colorItem, index) => {
                    return (
                      <div className="accordion-child" key={index}>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t("size")}</Accordion.Header>
                <Accordion.Body>
                  {OPTION_SIZE.map((sizeItem, index) => {
                    return (
                      <div className="accordion-child" key={index}>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t("gender")}</Accordion.Header>
                <Accordion.Body>
                  {OPTION_GENDER.map((gender, index) => {
                    return (
                      <div className="accordion-child" key={index}>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-md-9 col-xl-10">
            <div className="row search-and-filter">
              <div className="search-product col col-md-4 col-xl-3">
                <input
                  type="text"
                  placeholder={t("search")}
                  ref={ref}
                  onKeyDown={handleOnkeyDown}
                ></input>
                <div className="icon-search" onClick={handleSearch}>
                  <Icons.Search />
                </div>
              </div>
              <div className="col col-md-3 col-xl-5"></div>
              <div className="sort-product col col-md-5 col-xl-4">
                <Select
                  onChange={handleChangeSort}
                  options={SORT_OPTION}
                  placeholder={t("sort_by")}
                  // value={sortFlag}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={false}
                  styles={defaultStyles}
                  controlShouldRenderValue
                />
                <div className="icon-sort">
                  <Icons.Sort />
                </div>
              </div>
            </div>
            <div className="row list-product">
              {listProduct && listProduct.length > 0 ? (
                listProduct.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5"
                    >
                      <div className="item">
                        {product.discount > 0 && (
                          <div className="discount">
                            {t("discount_label", { param: product.discount })}
                          </div>
                        )}
                        <img
                          src={product.product_image[0]}
                          alt="product"
                          className="img-fluid product-thumbnail"
                        />
                        <div className="product-title">{product.name}</div>
                        {product.discount > 0 ? (
                          <div className="d-flex flex-column align-items-center mh-">
                            <div className="product-price-discount">
                              {currencyFormatting(
                                (
                                  product.price *
                                  (1 - product.discount / 100)
                                ).toFixed(2)
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="product-price">
                            {currencyFormatting(product.price)}
                          </div>
                        )}

                        <Link
                          className="icon-cross"
                          to={PATH.PRODUCT.DETAIL_PRODUCT.replace(
                            ":id",
                            product._id
                          )}
                        >
                          <p>{t("product_detail")}</p>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-product d-flex justify-content-center">
                  <img src={empty} alt="no-product"></img>
                </div>
              )}
              <div className="d-flex justify-content-center">
                <Pagination
                  page={page}
                  count={count}
                  pageNumber={pageNumber}
                  handlePageClick={(e) => setPage(e.selected + 1)}
                  handleChangePageNumber={(value) =>
                    handleChangePageNumber(value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [
      brandOption,
      count,
      defaultStyles,
      handleChangeFilter,
      handleChangePageNumber,
      handleChangeSort,
      handleOnkeyDown,
      handleSearch,
      listProduct,
      page,
      pageNumber,
      t,
    ]
  );
}

export default Products;
