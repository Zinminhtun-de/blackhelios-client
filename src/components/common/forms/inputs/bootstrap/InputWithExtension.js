import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
function InputExtension({ label, field, form, type, ext, ...props }) {
  let is_error = form.errors[field.name];
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Your Store Domain"
          error={Boolean(is_error)}
          {...props}
          {...field}
          type={type}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>{ext}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <span
        style={{
          color: "red",
        }}
      >
        {is_error}
      </span>
    </div>
  );
}

export default InputExtension;
