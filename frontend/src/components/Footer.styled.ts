import styled from "styled-components";
import breakpoints from "@utils/breakpoints";

export const FooterSection = styled.section`
  display: flex;
  justify-content: end;
  margin-left: -10vw;
  width: calc(100% + 15vw);

  p {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4px;
    margin: 2em 0;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 20px;
  }

  @media ${breakpoints.tablet.landscape} {
    margin-left: unset;
    width: unset;

    a {
      margin-right: 2em;
    }
  }

  @media ${breakpoints.mobile.large} {
    margin-left: unset;
    width: unset;
  }

  @media ${breakpoints.mobile.medium} {
    p {
      flex-direction: column;
    }

    a {
      margin: auto;
    }
  }
`;

export const GitHub = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
