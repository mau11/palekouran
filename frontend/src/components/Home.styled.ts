import breakpoints from "@utils/breakpoints";
import styled from "styled-components";
import { Button, Card, HeaderOne } from "@globalStyles";

export const Hero = styled.section`
  text-align: center;
  padding: 2em 2em 5em;
  max-width: 800px;
  margin: 0 auto;

  @media ${breakpoints.mobile.large} {
    padding: 2em 1em;
  }
`;

export const HeroTitle = styled(HeaderOne)`
  font-size: 2.5rem;
  margin-bottom: 1em;
  line-height: 1.2;
  justify-content: center;

  @media ${breakpoints.mobile.large} {
    font-size: 1.75rem;
  }
`;

export const HeroText = styled.p`
  font-size: 1.2rem;
  color: var(--grey);
  line-height: 1.6;
  margin-bottom: 2em;

  @media ${breakpoints.mobile.large} {
    font-size: 1.1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2em;
`;

export const SecondaryButton = styled(Button)`
  background: var(--accent);
  color: var(--primary);

  &:hover:not(:disabled) {
    background-color: var(--accent);
  }
`;

export const FeatureCard = styled(Card)`
  cursor: default;
  min-height: auto;
  align-items: center;
  text-align: center;
  border-color: var(--secondaryOp50);

  &:hover {
    transform: unset;
  }
`;

export const FeatureIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 0.5em;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.75em;
`;

export const FeatureText = styled.p`
  color: var(--grey);
  line-height: 1.6;
  font-size: 0.95rem;
`;
