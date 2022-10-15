import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

export interface ILayoutProp {
  title?: string;
  children: ReactNode;
}

const Layout = ({ children, title = "Home" }: ILayoutProp) => {
  return (
    <main className="max-w-[1600px] mx-auto my-0">
      <Head>
        <title>{title}-Crypto</title>
        <meta name="description" content="Crypto Collection" />
      </Head>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
