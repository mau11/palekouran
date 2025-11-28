import styled from "styled-components";

export const CardContainer = styled.section`
  border: 1px solid var(--black);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: var(--white);
`;

export const NavWrapper = styled.section`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Subtext = styled.p`
  color: var(--grey);
`;

export const AudioWrapper = styled.audio`
  margin: auto;
`;
