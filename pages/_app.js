import { SessionProvider, signIn, useSession } from "next-auth/react";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      session={pageProps?.session}
      basePath="/seleksi-jpt/api/auth"
      baseUrl="/seleksi-jpt"
      refetchInterval={0}
    >
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />;
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
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
