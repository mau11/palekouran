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
  color: var(--extra-light-grey);
  background-color: var(--secondary);
  background-image: var(--3d-effect);

  img {
    width: 20px;
  }

  @media ${breakpoints.mobile.medium} {
    flex-direction: column;
  }
`;

export const GitHubLink = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: center;
  gap: 4px;
  background-color: var(--extra-light-grey);
  border-radius: 50%;

  &:hover {
    transform: scale(1.05);
  }
`;
