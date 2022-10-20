import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/components/layout";
import { IssuesContextProvider } from "../src/context/issuesRepo.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IssuesContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IssuesContextProvider>
  );
}

export default MyApp;
