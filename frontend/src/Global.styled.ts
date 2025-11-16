import styled from "styled-components";
import breakpoints from "@utils/breakpoints";

// HEADERS
export const HeaderOne = styled.h1`
  background-color: var(--accent);
  color: var(--white);
  width: 100vw;
  margin: 0 -10vw 0.25em;
  padding: 1em 7.5vw;
  background-image: var(--3d-effect);

  a {
    text-decoration: none;
    color: var(--white);
  }

  @media ${breakpoints.tablet.landscape} {
    margin: 0 -5vw 0.25em;
    padding: 1em 5vw;
  }
}`;

export const HeaderTwo = styled.h2`
  margin-bottom: 1em;

  @media ${breakpoints.tablet.landscape} {
    margin: 0 -5vw 0.25em;
    padding: 1em 5vw;
  }
}`;

// INPUTS
export const InputError = styled.p`
  font-style: italic;
  color: var(--error);
`;

export const Label = styled.label`
  font-weight: 600;
  color: var(--black);
`;

// FORMS
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: 1em 0 2em;

  @media ${breakpoints.mobile.large} {
    margin: 0.5em 0 2em;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;

  @media ${breakpoints.mobile.large} {
    flex-direction: column;
    gap: 0.25em;
  }
`;
