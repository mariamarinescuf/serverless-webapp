/* eslint-disable import/no-anonymous-default-export */
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const { response } = error as AxiosError;
        if (response && response.status < 500) return false;
        if (failureCount < 3) return true;
        return false;
      },
      refetchOnWindowFocus: false,
    },
  },
});
