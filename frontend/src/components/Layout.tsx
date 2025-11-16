import { Outlet } from "react-router";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
