import "@ant-design/pro-layout/dist/layout.css";
import { Spin } from "antd";
import "antd/dist/antd.css";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider
      session={pageProps?.session}
      basePath="/seleksi-jpt/api/auth"
      baseUrl="/seleksi-jpt"
      refetchInterval={0}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />;
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({ children, roles }) {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "loading") {
    return <Spin />;
  }

  if (data?.user) {
    return children;
  } else {
    return <div>error</div>;
  }
}

export default MyApp;
