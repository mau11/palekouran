import breakpoints from "@utils/breakpoints";
import styled from "styled-components";

export const AboutContent = styled.section`
  h2 {
    font-weight: 600;
    color: var(--primary);
    margin: 1.75em 0 0.75em;
  }

  p {
    line-height: 1.8;
    margin-bottom: 1.5em;
  }

  @media ${breakpoints.mobile.large} {
    h2 {
      font-size: 1.3rem;
    }
  }
`;

export const InfoCard = styled.section`
  background: var(--secondaryOp10);
  border-left: 4px solid var(--accent);
  padding: 1em 1.5em;
  margin: 1.5em 0 1em;

  p {
    margin: 0;
    color: var(--secondary);
    font-style: italic;
  }
`;

export const FeatureList = styled.ul`
  padding: 0;
  margin: 1.5em 0;

  i {
    color: var(--accent);
    margin-right: 0.75em;
  }

  li {
    padding: 0.5em;
    display: flex;
    align-items: center;
  }
`;

export const Bold = styled.span`
  font-weight: 650;
`;
