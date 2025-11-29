import styled from "styled-components";
import breakpoints from "@utils/breakpoints";

export const FooterSection = styled.section`
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 1em;
  justify-content: center;
  text-align: center;
  width: 100%;
  align-items: center;
  gap: 6px;
  color: var(--background);
  background-color: var(--secondary);
  background-image: var(--3d-effect);
  box-shadow: 0 0 8px var(--secondary-light);

  div {
    display: flex;
    gap: 6px;
  }

  span {
    letter-spacing: 0.65px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  a {
    display: flex;
  }

  img {
    width: 20px;
  }

  @media ${breakpoints.mobile.large} {
    flex-direction: column;
  }
`;

export const FooterLink = styled.a`
  justify-content: center;
  text-decoration: none;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: scale(1.05);
  }
`;
