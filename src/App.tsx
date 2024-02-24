import React from "react";
import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "./App.css";

Amplify.configure({
  aws_project_region: "eu-central-1",
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: "eu-central-1",
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
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

export function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <>
      <h1>Hello Helloo {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
