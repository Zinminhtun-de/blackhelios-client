import AxiosService from "./axiosHelper";
import { prodEndpoint, endpoint } from "../config";
const axiosInstance = AxiosService.getInstance();
const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;

const authenticate = async () => {
  try {
    const data = await axiosInstance.get(`/auth`);
    return {
      success: true,
      data,
    };
  } catch (error) {
    /**
     * AUTH ENDPOINT ERROR
     *
     */
    console.log("/services/authApi/authenticate - error", error);
    return {
      data: null,
      success: false,
    };
  }
};
export { authenticate };
