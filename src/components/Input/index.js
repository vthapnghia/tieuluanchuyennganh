import { forwardRef, useCallback, useEffect, useState } from "react";
import { useField } from "formik";
import "./Input.scss";
import Icons from "../Icons";
import ReactSelect from "react-select";
import { COLOR } from "../../contanst/global";
const Input = forwardRef(
  (
    { leftIcon, style, type, disabled, options, quanlity, label, ...props },
    ref
  ) => {
    const [field, meta, helpers] = useField(props);
    const [misnusDisabled, setMinusDisabled] = useState(false);
    const [plusDisabled, setPlusDisabled] = useState(false);
    const [temp, setTemp] = useState(field.value ?? "");

    const colourDefaultStyles = {
      container: (styles) => ({
        ...styles,
        height: "58px",
      }),
      control: (styles, { isDisabled, isFocused }) => ({
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
        textAlign: "center"
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
        setTemp(field.value ?? "");
      }
    }, [field.value, options, type]);

    return (
      <div className="input-group">
        {label && <label><b>{label}</b></label>}
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
            {leftIcon && <span className="left-icon">{leftIcon}</span>}
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
                <Icons.Plus color={plusDisabled ? COLOR.GRAY : "currentcolor"} />
              </span>
            )}
          </>
        ) : type==="file" ? <input type="file"/> : (
          <ReactSelect
            className={props.className}
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
        {meta.error && meta.touched && type !== "select" ? (
          <span className="warning-icon-input">
            <Icons.Exclamation />
            <span className="tooltiptext">{meta.error}</span>
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default Input;
