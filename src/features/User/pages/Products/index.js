import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../Components/ProductItem";
import "./Products.scss";
import { getProduct, searchProduct, setFilter, setPageNumber, setSort } from "./ProductSlice";
import Icons from "../../../../components/Icons";
import Select from "react-select";
import {
  COLOR,
  OPTIONS_COLOR,
  OPTION_SIZE,
  OPTION_TYPE,
  SORT_OPTION,
} from "../../../../contanst/global";
import { getAllBrand } from "../../../Admin/pages/ManagementBrand/BrandSlice";
import Button from "../../../../components/Button";

function Products() {
  const products = useSelector((state) => state.product.products?.product);
  const brand = useSelector((state) => state.brand.allBrand?.brands);
  const filterFlag = useSelector((state) => state.product.filterFlag);
  const sortFlag = useSelector((state) => state.product.sortFlag);
  const pageNumber = useSelector((state) => state.product.pageNumber);
  const page = useSelector((state) => state.product.page);
  const { t } = useTranslation();
  const [listProduct, setListProduct] = useState(products);
  const dispatch = useDispatch();
  const [brandOption, setBrandOption] = useState([]);
  const ref = useRef();

  const getAllFilter = useMemo(() => {
    let category = [];
    let brand = [];
    let color = [];
    let size = [];
    let filter = {};
    OPTION_TYPE.forEach((item) => {
      category.push({ label: item.value, checked: false });
    });
    filter.type = category;
    brandOption?.forEach((item) => {
      brand.push({ label: item.label, checked: false });
    });
    filter.brand = brand;
    OPTIONS_COLOR.forEach((item) => {
      color.push({ label: item.label, checked: false });
    });
    filter.color = color;
    OPTION_SIZE.forEach((item) => {
      size.push({ label: item.label, checked: false });
    });
    filter.size = size;
    return filter;
  }, [brandOption]);

  const defaultStyles = {
    container: (styles) => ({
      ...styles,
      height: "58px",
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: COLOR.WHITE,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      width: "100%",
      borderRadius: "10px",
      paddingRight: "10px",
      border: `none`,
      // boxShadow: "none",
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
  };

  const handleChangeSort = useCallback(
    (e) => {
      let listCopy = [...listProduct];
      setListProduct(
        listCopy.sort((a, b) => {
          return (a.price - b.price) * Number(e.value);
        })
      );
      dispatch(setSort(Number(e.value)));
    },
    [listProduct, dispatch]
  );

  const handleFilter = useCallback(
    (arrFilter) => {
      let tempFilter = [...products];
      arrFilter.forEach((itemFilter) => {
        switch (itemFilter[0]) {
          case "type":
            itemFilter[1].forEach((childItemFilter) => {
              tempFilter = tempFilter.filter((productItem) => {
                return productItem.type === childItemFilter.label;
              });
            });
            break;
          case "brand":
            itemFilter[1].forEach((childItemFilter) => {
              tempFilter = tempFilter.filter((productItem) => {
                return productItem.brand === childItemFilter.label;
              });
            });
            break;
          case "color":
            itemFilter[1].forEach((childItemFilter) => {
              tempFilter = tempFilter.filter((productItem) => {
                return productItem.color === childItemFilter.label;
              });
            });
            break;
          case "size":
            itemFilter[1].forEach((childItemFilter) => {
              tempFilter = tempFilter.filter((productItem) => {
                return productItem.size[childItemFilter.label] > 0;
              });
            });
            break;
          default:
            break;
        }
      });

      setListProduct(
        tempFilter.sort((a, b) => {
          return (a.price - b.price) * sortFlag;
        })
      );
    },
    [products, sortFlag]
  );
  const handleChangeFilter = useCallback(
    (typeFilter, isChecked, label) => {
      getAllFilter[typeFilter]?.forEach((item, index) => {
        if (Number(item.label) === Number(label) || item.label === label) {
          getAllFilter[typeFilter][index] = {
            ...item,
            checked: isChecked,
          };
        }
      });
      let filterCopy = {};
      for (var key in getAllFilter) {
        const filterItem = getAllFilter[key].filter((item) => {
          return item.checked === true;
        });
        if (filterItem && filterItem.length > 0) {
          filterCopy = { ...filterCopy, [key]: filterItem };
        }
      }
      const filterArr = Object.entries(filterCopy);
      if (filterArr && filterArr.length > 0) {
        dispatch(setFilter(filterArr));
        handleFilter(filterArr);
      } else {
        setListProduct(
          [...products].sort((a, b) => {
            return (a.price - b.price) * sortFlag;
          })
        );
      }
    },
    [getAllFilter, products, handleFilter, sortFlag, dispatch]
  );

  const handleViewAdd = useCallback(() => {
    const number = (pageNumber / 10 + 1) * 10;
    dispatch(setPageNumber(number));
  }, [dispatch, pageNumber]);

  const handleSearch = useCallback(() => {
      dispatch(searchProduct(ref.current.value))
  }, [dispatch])

  const handleOnkeyDown = useCallback((e) => {
    if(e.key === "Enter"){
      dispatch(searchProduct(ref.current.value));
    }
}, [dispatch])

  useEffect(() => {
    if (sortFlag !== 0) {
      const productTemp = [...products];
      setListProduct(
        productTemp.sort((a, b) => {
          return (a.price - b.price) * sortFlag;
        })
      );
    } else {
      if (products && products.length > 0) {
        setListProduct(products);
      }
    }
  }, [products, sortFlag]);

  useEffect(() => {
    if (filterFlag && filterFlag.length > 0) {
      const filterFlagEntries = Object.fromEntries(filterFlag);
      for (let key in filterFlagEntries) {
        filterFlagEntries[key].forEach((itemFilterFlag) => {
          getAllFilter[key]?.forEach((item, index) => {
            if (
              Number(item.label) === Number(itemFilterFlag.label) ||
              item.label === itemFilterFlag.label
            ) {
              getAllFilter[key][index] = {
                ...item,
                checked: itemFilterFlag.checked,
              };
            }
          });
        });
      }
      handleFilter(filterFlag);
    }
  }, [filterFlag, handleFilter, getAllFilter]);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct({ page: page, pageSize: pageNumber }));
  }, [dispatch, pageNumber, page]);

  useEffect(() => {
    if (brand && brand.length > 0) {
      const brandItems = brand?.map((brandItem) => {
        return { value: brandItem._id, label: brandItem.name };
      });
      setBrandOption(brandItems);
    }
  }, [brand]);

  return (
    <div className="product-section">
      <div className="row">
        <div className="col col-md-3 product-filter">
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
                        defaultChecked={
                          filterFlag &&
                          Object.fromEntries(filterFlag)["type"] &&
                          Object.fromEntries(filterFlag)["type"].find(
                            (item) => {
                              return item.label === typeItem.value;
                            }
                          )
                            ? true
                            : false
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
                {brandOption?.map((brandItem, index) => {
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
                        defaultChecked={
                          filterFlag &&
                          Object.fromEntries(filterFlag)["brand"] &&
                          Object.fromEntries(filterFlag)["brand"].find(
                            (item) => {
                              return item.label === brandItem.label;
                            }
                          )
                            ? true
                            : false
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
                        defaultChecked={
                          filterFlag &&
                          Object.fromEntries(filterFlag)["color"] &&
                          Object.fromEntries(filterFlag)["color"].find(
                            (item) => {
                              return item.label === colorItem.label;
                            }
                          )
                            ? true
                            : false
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
                        defaultChecked={
                          filterFlag &&
                          Object.fromEntries(filterFlag)["size"] &&
                          Object.fromEntries(filterFlag)["size"].find(
                            (item) => {
                              return (
                                Number(item.label) === Number(sizeItem.value)
                              );
                            }
                          )
                            ? true
                            : false
                        }
                      />
                      <label>{sizeItem.label}</label>
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="search-product col col-md-4">
              <input type="text" placeholder={t("search")} ref={ref} onKeyDown={handleOnkeyDown}></input>
              <div className="icon-search" onClick={handleSearch}>
                <Icons.Search />
              </div>
            </div>
            <div className="col col-md-4"></div>
            <div className="sort-product col col-md-4">
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
            {listProduct?.map((product, index) => {
              return <ProductItem key={index} product={product} />;
            })}
          </div>
          {listProduct?.length > 19 && listProduct.count > listProduct?.length && (
            <div className="button-load text-center">
              <Button onClick={handleViewAdd} className="primary">
                {t("add_view")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
