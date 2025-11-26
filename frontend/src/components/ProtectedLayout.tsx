import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import AuthContext from "@contexts/AuthContext";

const ProtectedLayout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth, navigate]);

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

export default ProtectedLayout;
