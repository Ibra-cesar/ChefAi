import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ServerError {
  message: string;
  success: boolean;
}

export const ToastError = (error: unknown) => {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof AxiosError && error.response) {
    const serverError = error.response?.data as ServerError;

    if (serverError?.message) {
      errorMessage = serverError.message;
    } else {
      switch (error.response.status) {
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 403:
          errorMessage = "Forbidden. You don't have permission.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 422:
          errorMessage = "Validation failed. Please check your input.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = `Error: ${
            error.response.statusText || "Unknown error"
          }`;
      }
    }
  }else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage, {
    duration: 4000,
    style:{
      background: '#ef4444',
      borderRadius: '10px',
      color: '#fff',
    },
  })
};
