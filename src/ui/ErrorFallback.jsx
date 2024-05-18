import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 4.8rem; */
`;

const StyledContainer = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.3rem 1.5rem;
  ${media(breakpoints.xs)} {
    padding: 2.3 rem 3.2rem;
  }
  /* padding: 4.8rem; */
  /* flex: 0 1 96rem; */
  text-align: center;

  & h1 {
    color: var(--color-brand-500);
    margin-bottom: 1.6rem;
    font-size: 2rem;
    ${media(breakpoints.xs)} {
      font-size: 3rem;
    }
  }

  & p {
    /* font-family: "Sono"; */
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <StyledContainer>
          <Heading as="h1">Something went wrong !</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </StyledContainer>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
