// import { useState } from "react";
import styled from "styled-components";
import { useAllImages } from "../contexts/AllImagesContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import ButtonIconText from "../ui/ButtonIconText";
const StyledSlyderContainer = styled.div`
  overflow: hidden;
  max-width: 100vw;
  border-top: 1px solid var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
  padding-top: 2rem;
  padding-bottom: 2rem;
  position: relative;

  & > button {
    border-radius: 0;
    position: absolute;
    width: 50px;
    height: 59px;
    background-color: var(--color-brand-smallTransparency);
    color: #fff;
    top: 50%;
    transform: translateY(-50%);
    & > svg {
      color: var(--color-grey-100);
    }
  }
  & > button:first-child {
    left: 0;
  }
  & > button:last-child {
    right: 0;
  }
`;
const StyledImagesContainer = styled.div`
  display: flex;
  gap: 2.3rem;
`;
export default function Slider() {
  const { allImages } = useAllImages();

  return (
    <StyledSlyderContainer>
      <ImagesContainer images={allImages} />
      <ButtonIconText>
        <MdArrowBackIosNew />
      </ButtonIconText>
      <ButtonIconText>
        <MdArrowForwardIos />
      </ButtonIconText>
    </StyledSlyderContainer>
  );
}
function ImagesContainer({ images }) {
  const shorthandedList = images.slice(0, 5);
  // const [transformAmount, setTransformAmount] = useState(0);
  // const [counterUp, setCounterUp] = useState(0);
  // const [counterDown, setCounterDown] = useState(5);
  // const imagesCount = shorthandedList.length;

  // const style = {
  //   transform: `translateX(${transformAmount}px)`,
  // };
  return (
    <StyledImagesContainer>
      {shorthandedList.map((image) => (
        <img
          src={image.src}
          key={image.id}
          style={{ maxWidth: "200px", objectFit: "cover", aspectRatio: "2/3" }}
        />
      ))}
    </StyledImagesContainer>
  );
}
