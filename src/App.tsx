import React from "react";
import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import config from "./aws-exports";

import "./App.css";

Amplify.configure(config);

export function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <>
      <h1>Hello Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
