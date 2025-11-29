import styled from "styled-components";
import breakpoints from "@utils/breakpoints";
import { Button } from "@globalStyles";

export const Card = styled.section`
  background-color: var(--white);
  border-radius: 14px;
  padding: 1.75rem;
  border: 1px solid var(--grey-extra-light);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  margin-bottom: 2em;
`;

export const AcctHeaderTwo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5em;

  i {
    color: var(--accent);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media ${breakpoints.mobile.large} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.section`
  background-color: var(--primaryOp10);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--grey-extra-light);
`;

export const StatValue = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.p`
  font-size: 0.9rem;
  color: var(--grey);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media ${breakpoints.tablet.landscape} {
    grid-template-columns: 1fr;
  }
`;

export const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: var(--background);
    border-radius: 8px;
    font-size: 0.95rem;

    p {
      color: var(--secondary);
      font-weight: 600;
    }

    span {
      color: var(--black);
      text-align: right;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const DeckList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--background);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--grey-light);
    border-radius: 4px;
  }
`;

export const DeckItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 10px;
  transition: all 0.2s ease;
  gap: 1rem;

  &:hover {
    background-color: var(--primaryOp10);
  }

  span {
    font-weight: 600;
    color: var(--black);
    flex: 1;
  }

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

export const SmallButton = styled(Button)`
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--grey);
  font-style: italic;
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    align-self: center;
  }
`;
