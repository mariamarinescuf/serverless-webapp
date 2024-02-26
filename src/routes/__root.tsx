import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute<{
  queryClient: QueryClient;
}>({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>Not Found (on root route)</p>;
  },
});

function RootComponent() {
  return (   
          <>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
          </>
  );
}
