import { type NextPage } from "next";
import Head from "next/head";
import AdminPanel from "~/components/AdminPanel";
import NavBar from "~/components/NavBar";

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pro shop</title>
        <meta
          name="description"
          content="Electronics sample shop - Admin page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="">
        <AdminPanel />
      </main>
    </>
  );
};
export default AdminPage;
