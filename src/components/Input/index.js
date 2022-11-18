import { forwardRef } from "react";
import { Form, useField } from "formik";
import "./Input.scss";
import ReactSelect from "react-select";
import Icons from "../Icons";
const Input = forwardRef(
  ({ label, style, type, binary, icon, ...props }, ref) => {
    const [field, meta] = useField(props);

    const handleKeyDown = (evt) => {
      if (type === "number") {
        if (!binary) {
          ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault();
        } else {
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault();
        }
      }
    };

    return (
      <Form className="input-group">
       
          <input
            style={style}
            {...props}
            {...field}
          />

        {/* {type !== "number" && (
          <p
            className="text-danger m-0 p-0 error-label"
            style={{ minHeight: "20px" }}
          >
            {meta.error && meta.touched ? meta.error : ""}
          </p>
        )} */}
      </Form>
    );
  }
);

export default Input;
