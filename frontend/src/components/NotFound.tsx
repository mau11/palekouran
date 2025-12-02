import { HeaderOne, HeaderTwo, Spacer, Wrapper } from "@globalStyles";

const NotFound = () => (
  <Wrapper>
    <HeaderOne>404</HeaderOne>
    <HeaderTwo>Uh oh! Page not found.</HeaderTwo>
    <Spacer />
    <p>This page may be in development. Stay tuned!</p>
  </Wrapper>
);

export default NotFound;
