import React from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { QueryClient } from "@tanstack/react-query";

import "./App.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "routeTree.gen";
import { useSessionStorage } from "hooks";
import { RouterConfigWidget } from "./components";

Amplify.configure({
  aws_project_region: "eu-central-1",
  aws_cognito_identity_pool_id:
    process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: "eu-central-1",
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    domain: "https://serverlesswebapp36f.auth.eu-central-1.amazoncognito.com",
    scope: ["email"],
    redirectSignIn: process.env.REACT_APP_AWS_REDIRECT_URL,
    redirectSignOut: process.env.REACT_APP_AWS_REDIRECT_URL,
    responseType: "code",
    social_provider: {
      google: {
        app_id: process.env.REACT_APP_GMAIL_WEB_CLIENT_ID,
        scope: "email",
      },
    },
  },
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
} as any);

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

export function App() {
  // This stuff is just to tweak our dev setup in real-time
  const [loaderDelay, setLoaderDelay] = useSessionStorage("loaderDelay", 500);
  const [pendingMs, setPendingMs] = useSessionStorage("pendingMs", 1000);
  const [pendingMinMs, setPendingMinMs] = useSessionStorage(
    "pendingMinMs",
    500,
  );

  return (
    <>
      <RouterConfigWidget
        loaderDelay={loaderDelay}
        setLoaderDelay={setLoaderDelay}
        pendingMs={pendingMs}
        setPendingMs={setPendingMs}
        pendingMinMs={pendingMinMs}
        setPendingMinMs={setPendingMinMs}
      />
      <RouterProvider
        router={router}
        defaultPreload="intent"
        defaultPendingMs={pendingMs}
        defaultPendingMinMs={pendingMinMs}
        // context={{
        //   auth,
        // }}
      />
    </>
  );
}
