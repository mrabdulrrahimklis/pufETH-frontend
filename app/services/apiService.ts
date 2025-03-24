import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import interceptRequest from "../utils/interceptorRequest";
import interceptResponse from "../utils/interceptorResponse";
import statusChecker from "../utils/statusChecker";
import { HttpClient } from "./httpClient";

const initializeApiInterceptors = (httpClient: AxiosInstance): void => {
  interceptRequest(httpClient);
  interceptResponse(httpClient);
};

class ApiService {
  private _httpClient = HttpClient.getInstance();

  constructor() {
    initializeApiInterceptors(this._httpClient);
  }

  responseHandler<T = unknown>({ data }: AxiosResponse<T>) {
    return data;
  }

  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return statusChecker(await this._httpClient.get<T>(url, config));
  }

  async post<T = unknown, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return statusChecker(await this._httpClient.post<T>(url, body, config));
  }
}

export const apiService = new ApiService();