import styled, { css } from "styled-components";
import breakpoints from "@utils/breakpoints";

export const Wrapper = styled.section`
  max-width: 80vw;
  margin: auto;
  padding: 2.5em 0;

  @media ${breakpoints.tablet.landscape} {
    max-width: 90vw;
  }

  @media ${breakpoints.mobile.large} {
    padding: 1.5em 1em;
  }
`;

//
// HEADERS
//
export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5em;
  flex-wrap: wrap;
  gap: 1em;

  @media ${breakpoints.mobile.large} {
    margin-bottom: 1.5em;
  }
`;

export const HeaderOne = styled.h1`
  font-weight: 700;
  color: var(--primary);
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 0.5em;

  i {
    color: var(--accent);
    font-size: 2rem;
  }

  @media ${breakpoints.mobile.large} {
    font-size: 1.75rem;

    i {
      font-size: 1.5rem;
    }
  }
`;

export const HeaderTwo = styled.h3`
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--grey);
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.5em 1em;
  background-color: var(--bg-accent);
  border-radius: 8px;

  i {
    color: var(--secondary);
    font-size: 0.9rem;
  }
`;

//
// FORMS
//
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin: 1.5em 0 2em;
  max-width: 520px;
  background-color: var(--white);
  padding: 2em;
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--grey-extra-light);

  input[type="checkbox"] {
    margin-right: 0.6em;
    cursor: pointer;
    width: 20px;
    height: 20px;
    accent-color: var(--accent);
  }

  @media ${breakpoints.mobile.large} {
    margin: 0.5em 0 2em;
    padding: 1.5em;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

export const Row = styled.span`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: 600;
  color: var(--secondary);
  text-transform: uppercase;
  font-size: 0.8rem;
`;

export const StyledInput = styled.input`
  padding: 0.8em 1em;
  width: 100%;
  font-size: 1rem;
`;

export const InputError = styled.p`
  font-style: italic;
  color: var(--error);
  font-size: 0.85rem;
  margin-top: 0.25em;
  display: flex;
  align-items: center;
  gap: 0.4em;
`;

//
// BUTTONS
//
export const Button = styled.button`
  background-image: var(--gradient-primary);
  color: var(--white);
  border-radius: 10px;
  font-weight: 600;
  border: none;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
  overflow: hidden;
  white-space: nowrap;
  padding: 0.65em 1.3em;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    box-shadow: var(--shadow-secondary);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: var(--shadow-md);
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--grey);
  }
`;

export const SmallButton = styled(Button)<{ $color?: string }>`
  padding: 0.4em 0.9em;
  font-size: 0.85rem;

  ${({ $color }) =>
    $color &&
    css`
      background-image: unset;
      color: var(--primary);

      i {
        color: var(--${$color});
      }
    `}
`;

export const SubmitButton = styled(Button)`
  padding: 0.9em 2em;
  margin-top: 0.5em;
  font-size: 1rem;
  width: 100%;
`;

//
// LAYOUTS
//
export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5em;
  margin: 0;

  @media ${breakpoints.mobile.large} {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1em;
  }
`;

//
// CARDS + DECKS
//
export const Card = styled.div`
  background-color: var(--secondaryOp10);
  border-radius: 14px;
  padding: 1.75em;
  border: 1px solid var(--grey-extra-light);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  i {
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &:hover {
    border-color: var(--secondaryOp50);
    transform: translateY(-1px) scale(1.02);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(-3px) scale(1.01);
  }
`;

export const CardInfo = styled.span`
  display: flex;
  gap: 1.25em;
  align-items: center;
  font-size: 0.9rem;
  color: var(--primary);

  i {
    color: var(--accent);
    font-size: 1rem;
  }
`;

//
// GENERAL
//
export const EmptyState = styled.div`
  text-align: center;
  box-shadow: var(--shadow-sm);
  padding: 4em 2em;
  background-color: var(--white);
  border-radius: 20px;
  border: 2px dashed var(--grey-extra-light);
`;

export const EmptyText = styled.p`
  font-size: 1.2rem;
  color: var(--grey);
  font-weight: 500;
  margin-bottom: 1em;
`;

export const IconLinkWrapper = styled.span<{
  $color?: string;
  $disabled?: boolean;
}>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  border-radius: 10px;
  transition: all 0.2s ease;
  font-weight: 600;
  color: var(--${({ $color }) => ($color ? $color : "secondary")});
  font-size: 0.85rem;

  i {
    transition: all 0.2s ease;
    font-size: 0.95rem;
  }

  &:hover {
    background-color: var(--primaryOp01);
    color: var(--${({ $color }) => ($color ? $color : "secondary-dark")});
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      &:hover {
        transform: unset;
      }

      i {
        color: var(--grey-light);
      }
    `}
`;

export const Italic = styled.p`
  font-style: italic;
`;
