import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, router } from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Authenticator } from "@aws-amplify/ui-react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

createRoot(
  document.getElementById("root") as Element | DocumentFragment
).render(
  <React.StrictMode>
  <App />
</React.StrictMode>,
  // <React.StrictMode>
  //   <Authenticator>
  //     <QueryClientProvider client={queryClient}>
  //       {/* <TanStackRouterDevtools /> */}
  //     </QueryClientProvider>
  //   </Authenticator>
  // </React.StrictMode>
);

reportWebVitals();
