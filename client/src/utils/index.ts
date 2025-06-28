import axios from "axios";

// Custom instance of Axios
export const customFetch = axios.create({
  baseURL: "/api/v1",
});

// Error type interface
interface ApiError {
  response?: {
    data?: {
      msg?: string;
    };
  };
}

// Error message handler
export const errorMessageHandler = (error: ApiError): string => {
  const errorMessage =
    error?.response?.data?.msg || "Unexpected Error. Please try again later.";

  return errorMessage;
};
