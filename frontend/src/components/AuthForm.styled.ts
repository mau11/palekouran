import styled from "styled-components";
import breakpoints from "@utils/breakpoints";

export const AuthSubtext = styled.p`
text-align: center;
  margin: 1em 0;
  padding: 1em 0;
  border-top: 0.5px solid var(--black);

  a {
    text-decoration: underline;
    cursor: pointer;
  }

  @media ${breakpoints.mobile.large} {
    margin-bottom: 2em;
  }
}`;
