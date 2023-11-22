import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../components/auth/models";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getAdminMessage = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error
  };
};

export const getUsers = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/users`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error
  };
};

