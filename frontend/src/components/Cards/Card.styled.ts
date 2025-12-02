import breakpoints from "@utils/breakpoints";
import styled from "styled-components";

export const CardContainer = styled.section<{ $flipped: boolean }>`
  border: 1px solid var(--grey-extra-light);
  border-radius: 8px;
  padding: 1em;
  min-height: 250px;
  max-width: 700px;
  margin: 3em auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: var(--white);
  box-shadow: var(--shadow-card);

  // study view card flip animation:
  perspective: 2000px;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: rotateY(${(props) => (props.$flipped ? "180deg" : "0deg")});
`;

export const CardFace = styled.div`
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  position: relative;
`;

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

export const NavWrapper = styled.section`
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 2em auto 0;
`;

export const Subtext = styled.p`
  color: var(--grey);
`;

export const SmallSubtext = styled(Subtext)`
  font-size: 0.7rem;
  margin-top: 1em;
  font-style: italic;
`;

export const AudioWrapper = styled.audio`
  margin: 0.5em auto;
`;

export const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;
  margin: auto;

  audio {
    height: 2.5em;
  }

  @media ${breakpoints.mobile.large} {
    flex-direction: column;
  }
`;

export const FullSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 1em 0 1.5em;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  padding: 1.25em 1.5em;
  background-color: var(--white);
  border-radius: 14px;
  border: 1px solid var(--grey-extra-light);
  box-shadow: var(--shadow-card);

  i {
    color: var(--accent);
  }

  select {
    margin: 0 0.5em;
    padding: 0.5em 0.75em;
    font-size: 0.9rem;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--secondary);
  }
`;

export const DetailRow = styled.div`
  margin-bottom: 1.75em;
  padding-bottom: 1.25em;
  border-bottom: 1px solid var(--grey-extra-light);

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const DetailLabel = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--grey);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.5em;
`;

export const DetailValue = styled.p`
  font-size: 1.15rem;
  color: var(--black);
  line-height: 1.6;
  font-weight: 500;
`;

export const CardDetailSection = styled.section`
  background-color: var(--white);
  padding: 2.5em;
  border-radius: 20px;
  border: 1px solid var(--grey-extra-light);
  box-shadow: var(--shadow-md);
  margin: 2em auto;
  max-width: 650px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-light);
  }
`;

export const RatingSection = styled.section<{ $disabled?: boolean }>`
  margin-top: 2em;
  transition: all 0.2s ease;

  i {
    font-size: 1.75rem;
  }

  span:hover {
    transform: scale(1.1);
  }

  span:active {
    transform: scale(0.98);
  }
`;
