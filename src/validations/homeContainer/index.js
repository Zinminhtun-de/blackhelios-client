import * as Yup from "yup";
import axios from "axios";
import { endpoint, prodEndpoint } from "../../config";
import { debounce } from "lodash";
const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;
const ASYNC_VALIDATION_TIMEOUT_IN_MS = 200;

export {};
