import styled from "styled-components";

const IconTooltip = styled.span`
  position: absolute;
  width: 10rem;
  /* padding: 0.3rem 0.3rem; */
  text-align: center;
  color: var(--color-grey-100);
  transition: all 0.3 ease;
  font-size: 1rem;
  top: -0.5rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  text-transform: capitalize;
  visibility: hidden;
`;
const IconContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover > ${IconTooltip} {
    visibility: visible;
  }
`;
const IconImg = styled.img`
  max-width: 100%;
  width: 100%;
`;
export default function SocialMediaIcon({ text, src }) {
  return (
    <IconContainer>
      <IconImg src={src} />
      <IconTooltip>{text}</IconTooltip>
    </IconContainer>
  );
}
