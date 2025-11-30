import breakpoints from "@utils/breakpoints";
import styled from "styled-components";

export const FilterControls = styled.div`
  background-color: var(--white);
  border-radius: 14px;
  padding: 1em;
  margin-bottom: 1.5em;
  border: 1px solid var(--grey-extra-light);
  box-shadow: var(--shadow-card);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;

  select {
    padding: 0.5em 0.8em;
    border-color: var(--grey-light);
  }

  @media ${breakpoints.mobile.large} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;
  flex-wrap: wrap;

  select {
    min-width: 150px;
  }

  @media ${breakpoints.mobile.large} {
    width: 100%;

    select {
      flex: 1;
      min-width: unset;
    }
  }
`;

export const FilterLabel = styled.span`
  font-weight: 600;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.95rem;

  i {
    color: var(--accent);
  }
`;

export const ToggleButton = styled.button`
  background-color: var(--white);
  color: var(--primary);
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    color: var(--secondary-dark);
  }

  i {
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: rotate(180deg);
  }
`;

export const CardNotes = styled.p`
  font-style: italic;
  color: var(--grey);
  font-size: 0.95rem;
  margin-left: 2em;
  padding: 0.5em 1em;
  background-color: var(--accentOp10);
  border-left: 4px solid var(--accent);

  @media ${breakpoints.mobile.large} {
    margin: 0;
  }
`;

export const CardDelete = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--dark-red);
  padding: 0.4em;
  border-radius: 8px;
  transition: all 0.2s ease;
`;

export const DeckInfoSection = styled.section`
  background-color: var(--white);
  border-radius: 16px;
  padding: 1em;
  margin-bottom: 2em;
  border: 1px solid var(--grey-extra-light);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const DeckInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;

  @media ${breakpoints.mobile.large} {
    justify-content: center;
  }
`;

export const DeckActions = styled.div`
  display: flex;
  gap: 0.75em;
  flex-wrap: wrap;
`;

export const CardCount = styled.div`
  font-weight: 600;
  color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25em;
  border-radius: 8px;
  margin: 0 0.5em 0.25em 0;

  i {
    color: var(--accent);
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.3px;
  line-height: 1.3;
  text-align: center;
  word-break: break-word;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.25em;
`;
