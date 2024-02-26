import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Authenticator } from "@aws-amplify/ui-react";
import { AppNavbar } from "components";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
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
  );
}
