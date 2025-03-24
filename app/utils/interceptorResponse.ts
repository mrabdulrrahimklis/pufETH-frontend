import { type AxiosInstance } from "axios";

const interceptResponse = (httpClient: AxiosInstance): void => {
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        if (error.message === "Network Error") {
          console.error("Network error - server is probably down");
          throw error;
        } else {
          console.error("Unknown error", error);
          throw error;
        }
      } else {
        switch (error.response.status) {
          case 401: // Unauthorized
            localStorage.clear()
            break;
        }
      }
      return error.response;
    }
  );
};
export default interceptResponse;