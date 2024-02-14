import "@/styles/globals.scss";
import type { AppProps, AppContext } from "next/app";
import Header from "../components/Header/header";
import localFont from 'next/font/local'
import buildClient from '../api/build-client';
import styles from "@/styles/header.module.scss";
import { ApiInstances } from '../types/apiInstance.type'


const font = localFont({ src: '../fonts/lineto-circular-pro-book.ttf' })

type TProps = Pick<AppProps, "Component" | "pageProps">;

const AppComponent = ({ Component, pageProps }: TProps) => {
  return (
    <div>
      <main className={font.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </div>
  )
};

AppComponent.getInitialProps = async (appContext: { ctx: AppContext; Component: { getInitialProps: (ctx: AppContext, client: ApiInstances) => {} | Promise<TProps>; }; }) => {

  const client = buildClient();

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client);
  }

  return {
    pageProps
  };
};

export default AppComponent;
