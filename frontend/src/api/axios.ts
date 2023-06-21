import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function myAxios(axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> {
  const service = axios.create({
    baseURL: "http://127.0.0.1:3000", // 本地服务器环境
    timeout: 10000,
  });
  return service(axiosConfig);
}

export default myAxios;
