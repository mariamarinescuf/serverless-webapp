import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "./App.css";

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

export default function App() {
  return (
    <Authenticator socialProviders={["amazon", "apple", "facebook", "google"]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello Helloo {user?.signInDetails?.loginId}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
