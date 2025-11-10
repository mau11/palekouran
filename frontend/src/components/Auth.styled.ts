import breakpoints from "@utils/breakpoints";
import styled from "styled-components";

export const AuthSubtext = styled.p`
text-align: center;
  margin: 1em 0;
  padding: 1em 0;
  border-top: 0.5px solid var(--black);

  a {
    text-decoration: underline
  }

  @media ${breakpoints.mobile.large} {
    margin-bottom: 2em;
  }
}`;
