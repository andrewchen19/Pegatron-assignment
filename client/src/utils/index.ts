import axios from "axios";

// Custom instance of Axios
export const customFetch = axios.create({
  baseURL: "/api/v1",
});

// Error message handler
export const errorMessageHandler = (error: any): string => {
  const errorMessage =
    error?.response?.data?.msg || "Unexpected Error. Please try again later.";

  return errorMessage;
};
