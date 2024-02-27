import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppNavbar } from "components";

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
      <Authenticator socialProviders={["google"]}>
        {({ signOut, user }) => (
          <main>
            <AppNavbar
              signOut={signOut}
              userName={user?.signInDetails?.loginId}
            />
            <Outlet />
          </main>
        )}
      </Authenticator>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
