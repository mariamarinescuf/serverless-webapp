import React from 'react'
import { Authenticator } from "@aws-amplify/ui-react"
import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext } from "@tanstack/react-router"
import { Outlet } from "react-router-dom"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
  }>()({
    component: RootComponent,
  })
  
  function RootComponent() {
    return (
    <>
     <Authenticator socialProviders={["google"]}>
        {({ signOut, user }) => (
          <main id="app">
            <h1>Hello Helloo {user?.signInDetails?.loginId}</h1>
            <button onClick={signOut}>Sign out</button>
            <Outlet/>
          </main>
        )}
      </Authenticator>
      </>
    )
  }