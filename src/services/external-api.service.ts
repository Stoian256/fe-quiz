import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse, AppError } from "../components/auth/models";

export const callExternalApi = async (options: {
  config: AxiosRequestConfig;
}): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;

    return {
      data,
      error: null
    };
  } catch (error) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const { response } = axiosError;
        const responseDataError = (response.data as AppError).message;

        if (response && response.statusText) {
          message = response.statusText;
        }

        if (axiosError.message) {
          message = axiosError.message;
        }

        if (responseDataError) {
          message = responseDataError;
        }
      }
    } else {
      message = (error as Error).message;
    }

    return {
      data: null,
      error: {
        message
      }
    };
  }
};
