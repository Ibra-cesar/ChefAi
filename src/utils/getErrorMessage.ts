import axios from "axios";

export const extractErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return "Unknown Error Ocurred";
};