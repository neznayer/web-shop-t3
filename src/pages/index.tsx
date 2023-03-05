import { type NextPage } from "next";
import Head from "next/head";

import NavBar from "~/components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pro shop</title>
        <meta name="description" content="Electronics sample shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className=""></main>
    </>
  );
};

export default Home;
