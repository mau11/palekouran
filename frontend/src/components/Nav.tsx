import { useContext } from "react";
import { Link } from "react-router";
import { HeaderOne } from "@globalStyles";
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
            <Link to="/account">Account</Link>
            <Link to="/decks">Decks</Link>
            <span>{user.username}</span>
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
