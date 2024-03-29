import { forwardRef, useCallback, useEffect, useState } from "react";
import { Form, useField, useFormikContext } from "formik";
import "./Input.scss";
import Icons from "../Icons";
import ReactSelect from "react-select";
import { COLOR } from "../../constants/global";

const Input = forwardRef(
  (
    {
      icon,
      leftIcon,
      rightIcon,
      style,
      type,
      disabled,
      options = [],
      quantity,
      label,
      handleOnClickLeftIcon,
      textLabel,
      multiple,
      align,
      marginNone,
      readonly,
      max = 99,
      min = 1,
      handleIconQuantity,
      data,
      handleOnChange,
      accept,
      height,
      ...props
    },
    ref
  ) => {
    const [field, meta, helpers] = useField(props);
    const [misnusDisabled, setMinusDisabled] = useState(false);
    const [plusDisabled, setPlusDisabled] = useState(false);
    const [temp, setTemp] = useState(field.value ?? "");
    const { setFieldValue } = useFormikContext();
    const [viewPassword, setViewPassword] = useState(false);

    const colourDefaultStyles = {
      container: (styles) => ({
        ...styles,
        height: height ? height : "58px",
      }),
      control: (styles) => ({
        ...styles,
        backgroundColor: COLOR.WHITE,
        width: "100%",
        borderRadius: "4px",
        paddingRight: "10px",
        border: `1px solid #ddd`,
        fontSize: "16px",
        transition: "none",
        height: "100%",
        padding: height ? "0 2rem" :"1rem 2rem",
        textAlign: align ? align : "center",
        ":hover": {
          ...styles[":hover"],
          border: `1px solid #ddd`,
        },
        boxShadow: "none",
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
        handleOnChange && handleOnChange(items.value);
      },
      [helpers, handleOnChange]
    );

    const handleQuanlity = useCallback(
      (option) => (e) => {
        e.stopPropagation();
        if (option === -1) {
          if (meta.value - 1 >= min) {
            helpers.setValue(meta.value - 1);
            handleIconQuantity && handleIconQuantity(-1, data);
          }
        } else {
          if (meta.value + 1 <= max) {
            helpers.setValue(meta.value + 1);
            handleIconQuantity && handleIconQuantity(1, data);
          }
        }
      },
      [meta.value, min, helpers, handleIconQuantity, data, max]
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
      multiple
        ? setFieldValue(props.name, e.target.files)
        : setFieldValue(props.name, e.target.files[0]);
    };

    function containsNumbers(str) {
      return /^[0-9]+$/.test(str);
    }

    const onKeyDown = useCallback((e) => {
      if (!containsNumbers(e.key) && e.key !== "Backspace") {
        e.preventDefault();
      }
    }, []);

    useEffect(() => {
      if (type === "number") {
        if (meta.value === min) {
          setMinusDisabled(true);
        } else {
          if (meta.value === max) {
            setPlusDisabled(true);
          } else {
            setMinusDisabled(false);
            setPlusDisabled(false);
          }
        }
      }
    }, [type, meta, min, max]);

    useEffect(() => {
      if (type === "select") {
        const selected = options.find((option) => field.value === option.value);
        setTemp(selected);
      }
    }, [field.value, options, type, multiple]);

    return (
      <Form className={`input-group ${marginNone ? "m-0" : ""}`}>
        {label && (
          <label>
            {label}
          </label>
        )}
        {leftIcon && <span className="left-icon">{leftIcon}</span>}
        {type === "textarea" ? (
          <textarea
            {...props}
            {...field}
            className={`textarea-common ${
              meta.error && meta.touched ? "has-error" : ""
            } ${props.className ? props.className : ""}`}
            style={style}
            disabled={disabled}
          />
        ) : type === "text" || type === "password" ? (
          <>
            <input
              {...props}
              {...field}
              className={`input-common ${
                meta.error && meta.touched
                  ? type === "password"
                    ? "input-err-password"
                    : "has-error"
                  : ""
              } ${props.className ? props.className : ""}`}
              style={style}
              disabled={disabled}
              type={type === "text" ? type : viewPassword ? "text" : type}
            />
            {type === "password" && (
              <span
                className={`right-icon ${
                  meta.error && meta.touched && "ic-error"
                }`}
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? (
                  <Icons.Eye color={COLOR.GRAY_2} />
                ) : (
                  <Icons.EyeSlash color={COLOR.GRAY_2} />
                )}
              </span>
            )}
          </>
        ) : type === "number" ? (
          <>
            {quantity && !disabled && (
              <span className="minus left-icon" onClick={handleQuanlity(-1)}>
                <Icons.Minus
                  color={misnusDisabled ? COLOR.GRAY : "currentcolor"}
                />
              </span>
            )}
            <input
              {...props}
              {...field}
              type="text"
              className={`number-common ${
                meta.error && meta.touched ? "has-error" : ""
              } ${props.className ? props.className : ""}`}
              style={style}
              disabled={disabled}
              readOnly={readonly}
              onKeyDown={onKeyDown}
            />
            {quantity && !disabled && (
              <span className="plus right-icon" onClick={handleQuanlity(1)}>
                <Icons.Plus
                  color={plusDisabled ? COLOR.GRAY : "currentcolor"}
                />
              </span>
            )}
          </>
        ) : type === "file" ? (
          multiple ? (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="input-file"
            >
              <input
                type="file"
                id="file-input"
                accept={accept}
                onChange={onChangeFile}
                multiple
                hidden
              />
              <label htmlFor="file-input" className="label-img">
                {textLabel}
              </label>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={
                  typeof field?.value === "object"
                    ? URL.createObjectURL(field?.value)
                    : field?.value
                }
                alt="img"
                width={100}
                height={100}
                onLoad={(event) =>
                  (event.target.style.display = "inline-block")
                }
              />
              <input
                id="file"
                type="file"
                accept={accept}
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
              {textLabel && (
                <label htmlFor="file" className="label-img">
                  {textLabel}
                </label>
              )}
              {icon && (
                <label htmlFor="file" className="ic-edit">
                  <Icons.Edit />
                </label>
              )}
            </div>
          )
        ) : type === "select" ? (
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
            isDisabled={disabled}
          />
        ) : (
          <input
            {...props}
            {...field}
            className={`input-common ${
              meta.error && meta.touched ? "has-error" : ""
            } ${props.className ? props.className : ""}`}
            style={style}
            disabled={disabled}
            type={type}
          />
        )}
        {meta.error && meta.touched ? (
          <span className="warning-icon-input">
            <Icons.Exclamation />
            <span className="tooltiptext">{meta.error}</span>
          </span>
        ) : (
          <></>
        )}
      </Form>
    );
  }
);

export default Input;
