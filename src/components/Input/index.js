import { forwardRef, useCallback, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import "./Input.scss";
import Icons from "../Icons";
import ReactSelect from "react-select";
import { COLOR } from "../../contanst/global";
const Input = forwardRef(
  (
    {
      leftIcon,
      style,
      type,
      disabled,
      options = [],
      quanlity,
      label,
      handleOnClickLeftIcon,
      textLabel,
      multiple,
      align,
      marginNone,
      ...props
    },
    ref
  ) => {
    const [field, meta, helpers] = useField(props);
    const [misnusDisabled, setMinusDisabled] = useState(false);
    const [plusDisabled, setPlusDisabled] = useState(false);
    const [temp, setTemp] = useState(field.value ?? "");
    const { setFieldValue } = useFormikContext();

    const colourDefaultStyles = {
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
        textAlign: align ? align : "center",
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

    const handleChangeSelect = useCallback(
      (items) => {
        helpers.setValue(items.value);
      },
      [helpers]
    );

    const handleQuanlity = useCallback(
      (option) => () => {
        if (option === "decrease") {
          meta.value - 1 > 0 && helpers.setValue(meta.value - 1);
        } else {
          meta.value + 1 < 100 && helpers.setValue(meta.value + 1);
        }
      },
      [helpers, meta]
    );

    const onChangeFile = (e) => {
      let fileInput = document.getElementById("file-input");
      let imageContainer = document.getElementById("images");
      imageContainer.innerHTML = "";
      for (let i of fileInput.files) {
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        // figCap.innerText = i.name;
        figure.appendChild(figCap);
        reader.onload = () => {
          let img = document.createElement("img");
          img.setAttribute("src", reader.result);
          figure.insertBefore(img, figCap);
        };
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
      }
      multiple ? setFieldValue(props.name, e.target.files) : setFieldValue(props.name, e.target.files[0]);
    };

    useEffect(() => {
      if (type === "number") {
        if (meta.value === 1) {
          setMinusDisabled(true);
        } else {
          if (meta.value === 99) {
            setPlusDisabled(true);
          } else {
            setMinusDisabled(false);
            setPlusDisabled(false);
          }
        }
      }
    }, [type, meta]);

    useEffect(() => {
      if (type === "select") {
        const selected = options.find((option) => field.value === option.value);
        setTemp(selected);
      } else {
        if(type !== "file"){
          setTemp(field.value ?? "");
        }
      }
    }, [field.value, options, type]);

    return (
      <div className={`input-group ${marginNone ? "m-0" : ""}`}>
        {label && (
          <label>
            <b>{label}</b>
          </label>
        )}
        {type === "textarea" ? (
          <textarea
            {...props}
            {...field}
            value={temp}
            className={`textarea-common ${
              meta.error && meta.touched ? "has-error" : ""
            } ${props.className ? props.className : ""}`}
            style={style}
            disabled={disabled}
          />
        ) : type === "text" || type === "password" ? (
          <>
            {/* {leftIcon && <span className="left-icon" onClick={handleOnClickLeftIcon(temp)}>{leftIcon}</span>} */}
            <input
              {...props}
              {...field}
              value={temp}
              className={`input-common ${
                meta.error && meta.touched ? "has-error" : ""
              } ${props.className ? props.className : ""}`}
              style={style}
              disabled={disabled}
              type={type}
            />
          </>
        ) : type === "number" ? (
          <>
            {quanlity && (
              <span
                className="minus left-icon"
                onClick={misnusDisabled ? () => {} : handleQuanlity("decrease")}
              >
                <Icons.Minus
                  color={misnusDisabled ? COLOR.GRAY : "currentcolor"}
                />
              </span>
            )}
            <input
              {...props}
              {...field}
              type={type}
              value={temp}
              className={`number-common ${
                meta.error && meta.touched ? "has-error" : ""
              } ${props.className ? props.className : ""}`}
              style={style}
              disabled={disabled}
            />
            {quanlity && (
              <span
                className="plus right-icon"
                onClick={plusDisabled ? () => {} : handleQuanlity("increase")}
              >
                <Icons.Plus
                  color={plusDisabled ? COLOR.GRAY : "currentcolor"}
                />
              </span>
            )}
          </>
        ) : type === "file" ? (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="input-file"
          >
            {/* {!multiple ? (
              <>
                <img
                  src={temp}
                  alt="img"
                  onLoad={(event) =>
                    (event.target.style.display = "inline-block")
                  }
                  className="image mb-3"
                />

                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setTemp(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                    setFieldValue(props.name, e.target.files[0]);
                  }}
                  style={style}
                  hidden
                />
              </>
            ) : (
              <> */}
                <input
                  type="file"
                  id="file-input"
                  accept="image/png, image/jpeg"
                  onChange={onChangeFile}
                  multiple
                  hidden
                />
              {/* </>
            )} */}
            <label htmlFor="file-input" className="label-img">
              {textLabel}
            </label>
          </div>
        ) : (
          <ReactSelect
            className={`${meta.error && meta.touched ? "has-error" : ""} ${
              props.className ? props.className : ""
            }`}
            onChange={handleChangeSelect}
            type="select"
            value={temp}
            options={options}
            isSearchable={false}
            styles={colourDefaultStyles}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            menuPortalTarget={document.body}
            placeholder={props.placeholder ?? ""}
            placement="auto"
            isDisabled={props.disabled}
          />
        )}
        {meta.error && meta.touched ? (
          <span className="warning-icon-input">
            <Icons.Exclamation />
            <span className="tooltiptext">{meta.error && meta.touched}</span>
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default Input;
