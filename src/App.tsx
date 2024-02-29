import "@aws-amplify/ui-react/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";
import { awsConfig } from "./awsConfig";
import { RouterConfigWidget } from "./components";
import { useSessionStorage } from "./hooks";
import { routeTree } from "./routeTree.gen";

Amplify.configure(awsConfig);

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
  const devEnv = import.meta.env.VITE_ENV_DEVELOPMENT === "localhost";
  // This stuff is just to tweak our dev setup in real-time
  const [loaderDelay, setLoaderDelay] = useSessionStorage("loaderDelay", 500);
  const [pendingMs, setPendingMs] = useSessionStorage("pendingMs", 1000);
  const [pendingMinMs, setPendingMinMs] = useSessionStorage(
    "pendingMinMs",
    500,
  );

  return (
    <>
      {devEnv && (
        <RouterConfigWidget
          loaderDelay={loaderDelay}
          setLoaderDelay={setLoaderDelay}
          pendingMs={pendingMs}
          setPendingMs={setPendingMs}
          pendingMinMs={pendingMinMs}
          setPendingMinMs={setPendingMinMs}
        />
      )}
      <RouterProvider
        router={router}
        defaultPreload="intent"
        defaultPendingMs={devEnv ? pendingMs : undefined}
        defaultPendingMinMs={devEnv ? pendingMinMs : undefined}
        // context={{
        //   auth,
        // }}
      />
    </>
  );
}
