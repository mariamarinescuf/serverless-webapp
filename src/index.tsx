import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(
  document.getElementById("root") as Element | DocumentFragment
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
