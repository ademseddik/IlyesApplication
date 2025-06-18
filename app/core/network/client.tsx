import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { encode } from "base64-arraybuffer";

// Define the structure of error responses
interface ErrorResponse {
  error: string;
}

// Define the structure of API responses
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

export default class NetworkingClientImpl {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async Post<T = any>(
    uri: string,
    body?: any,
    contentType: string = "application/json"
  ): Promise<ApiResponse<T>> {
    return this.__mutate<T>("POST", uri, body, contentType);
  }

  async Get<T = any>(uri: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(uri);
      return { data: response.data };
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>; // Explicitly type the error response
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      console.error(JSON.stringify(error));
      return { error: errorMessage };
    }
  }

  async Put<T = any>(
    uri: string,
    body?: any,
    contentType: string = "application/json"
  ): Promise<ApiResponse<T>> {
    return this.__mutate<T>("PUT", uri, body, contentType);
  }

  async Patch<T = any>(
    uri: string,
    body?: any,
    contentType: string = "application/json"
  ): Promise<ApiResponse<T>> {
    return this.__mutate<T>("PATCH", uri, body, contentType);
  }

  async Delete<T = any>(uri: string): Promise<ApiResponse<T>> {
    return this.__mutate<T>("DELETE", uri, undefined, "*/*");
  }

  private async __mutate<T = any>(
    action: string,
    url: string,
    body?: any,
    contentType: string = "application/json"
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        method: action,
        url,
        data: body,
        headers: {
          Accept: "application/json",
          "Content-Type": contentType,
        },
      });

      if (response.status >= 400) {
        return {
          error: (response.data as ErrorResponse)?.error || "Something went wrong.",
        };
      }

      return { data: response.data };
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>; // Explicitly type the error response
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      console.error(JSON.stringify(error));
      return { error: errorMessage };
    }
  }

  async Uploader<T = any>(
    url: string,
    body: FormData,
    method: string = "POST"
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        method,
        url,
        data: body,
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: (data) => data, // Directly pass the body
      });

      return { data: response.data };
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>; // Explicitly type the error response
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      console.error(JSON.stringify(error));
      return { error: errorMessage };
    }
  }

  async GetImage(url: string): Promise<string> {
    try {
      const response = await this.axiosInstance.get(url, {
        responseType: "arraybuffer",
      });

      const base64Image = encode(response.data);
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>; // Explicitly type the error response
      console.error(JSON.stringify(error));
      throw new Error("Failed to fetch image");
    }
  }
}