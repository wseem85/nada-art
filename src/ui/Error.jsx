import styled from "styled-components";

const StyledError = styled.div`
  margin: auto;
`;

export default function Error({ message }) {
  return (
    <StyledError message={message}>Something went wrong {message}</StyledError>
  );
}
