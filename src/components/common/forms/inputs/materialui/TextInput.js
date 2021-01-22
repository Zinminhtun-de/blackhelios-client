import React from "react";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
function TextInput({ label, field, form, type, size, ...props }) {
  const iss_error = getIn(form.errors, field.name);

  return (
    <div>
      <TextField
        error={iss_error}
        label={label}
        variant="outlined"
        {...props}
        {...field}
        value={field.value || ""}
        type={type}
        size={size}
        InputProps={{
          inputProps: {
            min: 1,
          },
          style: {
            fontSize: "0.8rem",
          },
        }}
        InputLabelProps={{
          style: { fontSize: "0.8rem" },
        }}
        helperText={""}
      />
    </div>
  );
}

export default TextInput;
