import { t } from "i18next";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../../components/Input";
import {
  OPTIONS_COLOR,
  OPTION_GENDER,
  OPTION_SIZE,
  OPTION_TYPE,
} from "../../../../../contanst/global";
import "./ProductDetail.scss";

function ProductDetailAdmin(props) {
  const { productImages } = props;
  const brand = useSelector((state) => state.brand.allBrand?.brands);

  const brandOption = useMemo(() => {
    return brand?.map((brandItem) => {
      return { value: brandItem.name, label: brandItem.name };
    });
  }, [brand]);

  return (
    <div className="product-detail-admin">
      <div className="row d-flex justify-content-center">
        <div className="col col-md-6 col-sm-12 ">
          <div className="multiple-img">
            <div id="images">
              <div className="display-img">
                {productImages &&
                  productImages.length > 0 &&
                  productImages.map((img, index) => {
                    return (
                      <figure key={index}>
                        <img src={img} alt="img" />
                      </figure>
                    );
                  })}
              </div>
            </div>
            <Input
              name="image"
              type="file"
              className="img-upload"
              textLabel={t("upload_img")}
              multiple
            />
          </div>
          <div className="input">
            <Input name="name" placeholder={t("name_product")} type="text" />
          </div>
          <div className="input">
            <Input
              name="price"
              placeholder={t("price")}
              type="number"
              style={{ textAlign: "left" }}
            />
          </div>
          <div className="input">
            <Input
              name="brand"
              placeholder={t("brand")}
              type="select"
              options={brandOption}
              align="left"
            />
          </div>

          <div className="input">
            <Input
              name="description"
              placeholder={t("description")}
              type="textarea"
            />
          </div>
          <div className="input">
            <Input
              name="discount"
              placeholder={t("discount")}
              type="number"
              style={{ textAlign: "left" }}
            />
          </div>
        </div>
        <div className="col col-md-6 col-sm-12 ">
          <div className="input">
            <Input
              name="type"
              placeholder={t("type")}
              type="select"
              options={OPTION_TYPE}
              align="left"
            />
          </div>
          <div className="input">
            <Input
              name="gender"
              placeholder={t("gender")}
              type="select"
              options={OPTION_GENDER}
              align="left"
            />
          </div>
          <div className="input">
            <Input
              name="color"
              placeholder={t("color")}
              type="select"
              options={OPTIONS_COLOR}
              align="left"
            />
          </div>
          <div className="row input">
            {OPTION_SIZE.map((sizeItem, index) => {
              return (
                <div
                  className="d-flex flex-column col col-md-6 col-sm-12 mt-2"
                  key={index}
                >
                  <label>
                    {t("size")} {sizeItem.value}
                  </label>
                  <Input
                    name={sizeItem.value}
                    placeholder={t("quantity")}
                    type="number"
                    style={{ padding: "16px 30px" }}
                    marginNone
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailAdmin;
