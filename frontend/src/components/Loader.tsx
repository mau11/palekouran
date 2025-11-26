import { Wrapper } from "@globalStyles";
import { LoadingContainer, LoadingSpinner, LoadingText } from "./Loader.styled";

const Loader = () => {
  return (
    <Wrapper>
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
        <LoadingSpinner />
      </LoadingContainer>
    </Wrapper>
  );
};

export default Loader;
