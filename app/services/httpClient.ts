import axios, { type AxiosInstance } from "axios";

export abstract class HttpClient {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: "https://dolphin-app-co772.ondigitalocean.app/",
        timeout: 60000,
      });
    }
    return HttpClient.instance;
  }
}