import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { HeaderOne } from "@globalStyles";
import {
  Header,
  NavBar,
  NavLink,
  Burger,
  NavSection,
  NavSpan,
  ContextMenu,
  NavLinkBtn,
} from "./Nav.styled";
import AuthContext from "@contexts/AuthContext";

const Nav = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const { handleSignOut, user } = auth;
  const { pathname } = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    setShowMenu(false);
    setBurgerOpen(false);
  }, [pathname]);

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleBurgerClick = () => {
    setBurgerOpen(!burgerOpen);
    setShowMenu(false);
  };

  return (
    <Header>
      <NavBar>
        <NavLink to="/">
          <HeaderOne>
            <i className="fa-solid fa-comment-dots"></i>Palekouran
          </HeaderOne>
        </NavLink>

        {/* mobile */}
        <Burger onClick={handleBurgerClick}>
          <span />
          <span />
          <span />
        </Burger>

        <NavSection $open={burgerOpen}>
          <NavLink to="/">Home</NavLink>
          {/* <NavLink to="/about">About</NavLink> */}

          {user?.id ? (
            <>
              <NavLink to="/decks">My Decks</NavLink>

              {/* desktop avatar */}
              {!burgerOpen && (
                <NavSpan onClick={handleAvatarClick}>
                  <i className="fa-solid fa-user"></i>
                  {user.username}
                </NavSpan>
              )}

              {/* mobile expanded menu */}
              {burgerOpen && (
                <>
                  <NavLink to="/account">Account</NavLink>
                  <NavSpan onClick={handleSignOut}>Log out</NavSpan>
                </>
              )}

              {/* desktop account dropdown */}
              {showMenu && !burgerOpen && (
                <ContextMenu>
                  <NavLink to="/account">Account</NavLink>
                  <NavSpan onClick={handleSignOut}>Log out</NavSpan>
                </ContextMenu>
              )}
            </>
          ) : (
            <NavLinkBtn to="/login">Log in</NavLinkBtn>
          )}
        </NavSection>
      </NavBar>
    </Header>
  );
};

export default Nav;
