import { useContext } from "react";
import { Link } from "react-router";
import { HeaderOne } from "../Global.styled";
import { NavHeader } from "./Nav.styled";
import AuthContext from "@contexts/AuthContext";

const Nav = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const { handleSignOut, user } = auth;

  return (
    <NavHeader>
      <nav>
        <HeaderOne>
          <a href="/">Palekouran</a>
        </HeaderOne>
        <Link to="/">Home</Link>
        {user?.id ? (
          <>
            <Link to="/account">My Account</Link>
            <a onClick={handleSignOut}>Log out</a>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>
    </NavHeader>
  );
};

export default Nav;
