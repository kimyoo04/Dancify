import "../styles/globals.css";
import "../styles/button.css";
import "../styles/chat.css";
import "../styles/tiptap.css";
import "../styles/logo.css";
import "../styles/scrollbar.css";
import "regenerator-runtime/runtime.js";

import Head from "next/head";
import type { AppProps } from "next/app";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { store } from "@toolkit/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@components/ui/toaster";

import verifyUser from "@api/auth/verifyUser";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30000,
          },
        },
      })
  );

  //! JWT 인증 (첫 방문 혹은 새로고침 시 작동)
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <Head>
        <title>Dancify</title>
        <meta name="description" content="Dance Feedback AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>

      <ThemeProvider attribute="class">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <main>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={true} />
              <Toaster />
            </main>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
