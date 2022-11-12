import { forwardRef } from "react";
import { Form, useField } from "formik";
import "./Input.scss";
const Input = forwardRef(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  return (
    <Form className="input-formik">
      <label>{label}</label>
      <input {...props} {...field} />
      <p
        className="text-danger m-0 p-0 error-label"
        style={{ minHeight: "20px" }}
      >
        {meta.error && meta.touched ? meta.error : ""}
      </p>
    </Form>
  );
});

export default Input;
