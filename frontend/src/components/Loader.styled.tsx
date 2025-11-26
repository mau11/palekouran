import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 8px solid var(--extra-light-grey);
  border-top-color: var(--opAccent);
  border-radius: 50%;
  animation: spin 1.25s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: var(--grey);
  font-size: 1.1rem;
`;
