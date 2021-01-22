import AxiosService from "../axiosHelper";
import { prodEndpoint, endpoint } from "../../config";
const axiosInstance = AxiosService.getInstance();
const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;

export {};
