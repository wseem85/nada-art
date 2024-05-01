import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import { StyledLogo } from "../ui/Logo";
import Heading from "../ui/Heading";
const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <SignupLayout>
      <StyledLogo>Nada art</StyledLogo>
      <Heading as="h4">create an account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
