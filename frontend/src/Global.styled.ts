import styled from "styled-components";
import breakpoints from "@utils/breakpoints";

export const Wrapper = styled.section`
  max-width: 90vw;
  margin: auto;
  padding: 2em 0;
`;

//
// HEADERS
//
export const HeaderOne = styled.h1`
  font-weight: 600;
  color: var(--secondary);
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

//
// FORMS
//
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  margin: 1em 0 2em;
  max-width: 420px;

  @media ${breakpoints.mobile.large} {
    margin: 0.5em 0 2em;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;

  @media ${breakpoints.mobile.large} {
    gap: 0.25em;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: var(--black);
  font-size: 0.95rem;
`;

export const StyledInput = styled.input`
  padding: 0.65rem 0.75rem;
  width: 100%;
`;

export const InputError = styled.p`
  font-style: italic;
  color: var(--error);
  font-size: 0.85rem;
  margin-top: -0.5em;
`;

//
// BUTTONS
//
export const Button = styled.button`
  background-color: var(--accent);
  color: var(--white);
  border-radius: 6px;
  font-weight: 600;
  border: none;
  padding: 0.4em 1em;
  background-image: var(--3d-effect);
  transition: 0.25s all;

  &:hover {
    transform: scale(1.02);
  }

  &:hover:not(:disabled) {
    background-color: var(--accent);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(Button)`
  padding: 0.75rem;
  margin-top: 1em;
`;

//
// DECKS/CARDS
//
export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media ${breakpoints.mobile.large} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Card = styled.div`
  background-color: var(--white);
  border-radius: 20px;
  padding: 2rem;
  border: 0.5px solid transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0 2px 8px var(--opBlack);

  i {
    &:hover {
      opacity: 0.8;
    }
  }

  &:hover {
    border-color: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 15px 35px var(--opAccent2);
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1em;
`;

export const CardInfo = styled.span`
  display: flex;
  gap: 1em;

  i {
    color: var(--accent2);
  }
`;

export const CardDelete = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  color: var(--dark-red);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--white);
  border-radius: 20px;
  border: 2px dashed var(--extra-light-grey);
`;

export const EmptyText = styled.p`
  font-size: 1.2rem;
  color: var(--grey);
`;
