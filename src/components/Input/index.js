import { forwardRef, useCallback, useEffect, useState } from "react";
import { useField } from "formik";
import "./Input.scss";
import Icons from "../Icons";
import { Form } from "react-bootstrap";
const Input = forwardRef(
  ({ leftIcon, style, type, disabled, options, quanlity, ...props }, ref) => {
    const [field, meta, helpers] = useField(props);
    const [misnusDisabled, setMinusDisabled] = useState(false);
    const [plusDisabled, setPlusDisabled] = useState(false);

    const handleChangeSelect = useCallback(
      (e) => {
        const selected = options.find(
          (option) => option.value === Number(e.target.value)
        );
        helpers.setValue(selected?.value);
      },
      [options]
    );

    const handleQuanlity = useCallback(
      (option) => () => {
        console.log(option);
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

    return (
      <div className="input-group">
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
        ) : type === "text" ? (
          <>
            {leftIcon && <span className="left-icon">{leftIcon}</span>}
            <input
              {...props}
              {...field}
              className={`input-common ${
                meta.error && meta.touched ? "has-error" : ""
              } ${props.className ? props.className : ""}`}
              style={style}
              disabled={disabled}
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
                  color={misnusDisabled ? "#fafbfc" : "currentcolor"}
                />
              </span>
            )}
            <input
              {...props}
              {...field}
              type={type}
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
                <Icons.Plus color={plusDisabled ? "#fafbfc" : "currentcolor"} />
              </span>
            )}
          </>
        ) : (
          <Form.Select
            aria-label="Default select example"
            disabled={disabled}
            onChange={handleChangeSelect}
            {...props}
            {...field}
            className={`select-common ${
              props.className ? props.className : ""
            }`}
            style={style}
          >
            {options &&
              options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
          </Form.Select>
        )}
        {meta.error && meta.touched && type !== "select" ? (
          <span className="warning-icon-input">
            <Icons.Exclamation />
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default Input;
