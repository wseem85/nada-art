import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import { StyledLogo } from "../ui/Logo";
import Heading from "../ui/Heading";
import { media } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import withScrollToTop from "../ui/withScroolToTop";
const SignupLayout = styled.main`
  padding: 1.3rem 1.7rem;
  margin-top: 2.3rem;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
  background-color: var(--color-grey-50);
  & > form {
    width: 100%;
  }
  & > h3 {
    text-transform: uppercase;
  }
  ${media(breakpoints.xs)} {
    & > form {
      max-width: 50rem;
    }
  }
`;

function SignupComponent() {
  return (
    <SignupLayout>
      <StyledLogo>Nada art</StyledLogo>
      <Heading as="h3">create an account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}
const Signup = withScrollToTop(SignupComponent);
export default Signup;
