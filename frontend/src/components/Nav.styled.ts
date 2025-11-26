import styled from "styled-components";
import { Link } from "react-router";
import breakpoints from "@utils/breakpoints";

export const Header = styled.header`
  background-color: var(--white);
  box-shadow: 0 0 8px var(--accent);
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80vw;
  margin: auto;
  padding: 1em 0;

  i {
    color: var(--accent);
  }

  @media ${breakpoints.tablet.landscape} {
    max-width: 90vw;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;

  h1 {
    font-size: 1.5em;
    font-weight: 900;
    color: var(--accent);
    display: flex;
    gap: 0.25em;
    align-items: center;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export const NavSection = styled.section<{ $open: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1em;

  @media ${breakpoints.mobile.large} {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background-color: var(--white);
    padding: 1em 0;
    box-shadow: 0 5px 10px -5px var(--light-grey);
    z-index: 10;
  }
`;

export const Burger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    width: 24px;
    height: 3px;
    background-color: var(--black);
    border-radius: 2px;
  }

  @media ${breakpoints.mobile.large} {
    display: flex;
  }
`;

export const NavSpan = styled.span`
  cursor: pointer;
`;

export const ContextMenu = styled.div`
  display: flex;
  position: absolute;
  top: 2em;
  right: -1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  background-color: var(--white);
  padding: 0.5em 1em;
  box-shadow: 0 5px 8px -4px var(--light-grey);
  border-radius: 0 0 5px 5px;
  z-index: 20;
`;

export const NavLinkBtn = styled(NavLink)`
  background-color: var(--accent);
  color: var(--white);
  padding: 0.4em 1em;
  border-radius: 5px;
  background-image: var(--3d-effect);

  &:hover {
    filter: brightness(0.9);
  }
`;
