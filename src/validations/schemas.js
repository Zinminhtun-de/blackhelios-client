import * as Yup from "yup";
import axios from "axios";
import { endpoint, prodEndpoint } from "../config";
import { debounce } from "lodash";
const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;
const ASYNC_VALIDATION_TIMEOUT_IN_MS = 200;

const CreateOwnerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  firstname: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
});
const CreateOwnerSchema2 = Yup.object().shape({
  store_domain: Yup.string()
    .required("Required")
    .test(
      "Unique Domain",
      "Store Name already in use",
      debounce(function (value) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${URL}api/v1/owner/check/domain`, {
              store_domain: value,
            })
            .then((res) => {
              if (res.data.success) {
                resolve(true);
              }
              resolve(false);
            });
        });
      }, ASYNC_VALIDATION_TIMEOUT_IN_MS)
    ),
  store_name: Yup.string().required("Required"),
  township: Yup.string().nullable().required("Required"),
  region: Yup.string().nullable().required("Required"),
});
const CreateCategorySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  id: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9]*$/gm, "No Space Allowed"),
  has_parent: Yup.boolean(),
  parent_category: Yup.string()
    .nullable()
    .when("has_parent", {
      is: (has_parent_val) => {
        console.log("has_parent_val", has_parent_val);
        return has_parent_val;
      },
      then: Yup.string().required("Parent Category Required"),
      otherwise: Yup.string(),
    }),
});
const CreateCategorySubSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  id: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9]*$/gm, "No Space Allowed"),
  parent_category: Yup.string().nullable().required("Required"),
});
const LoginOwnerSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});
const ChangePasswordSchema = Yup.object().shape({
  new_password: Yup.string().required("Required"),
  old_password: Yup.string().required("Required"),
});
const ResetPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required("Required"),
});
const createPriceListSchema = Yup.object().shape({
  township: Yup.string().nullable().required("Required"),
  price: Yup.number().required("Required"),
});
const createSliderSchema = Yup.object().shape({
  slider_name: Yup.string().nullable().required("Required"),
  slider_group: Yup.string().nullable().required("Required"),
  collection_id: Yup.string().nullable().required("Required"),
});
const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  alias: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
  details: Yup.object().shape({
    sku: Yup.string().nullable().required("Required"),
    description: Yup.string().nullable().required("Required"),
    dimension: Yup.object().shape({
      length: Yup.number().required("Required"),
      width: Yup.number().required("Required"),
      height: Yup.number().required("Required"),
      weight: Yup.number().required("Required"),
    }),
  }),
  price: Yup.object().shape({
    normal: Yup.number().nullable().required("Required"),
  }),
});
export {
  CreateOwnerSchema,
  LoginOwnerSchema,
  CreateOwnerSchema2,
  CreateCategorySchema,
  CreateProductSchema,
  createPriceListSchema,
  createSliderSchema,
  CreateCategorySubSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
};
