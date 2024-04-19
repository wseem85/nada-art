// import { Link } from "react-router-dom";
// import { SlArrowRightCircle } from "react-icons/sl";

import styled from "styled-components";
import { media, formatCurrency } from "../utils/helpers";
import { breakpoints } from "../utils/variables";
import Heading from "./Heading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import Paragraph from "./Paragraph";
const StyledCategoryContainer = styled.div`
  /* margin-bottom: 2rem; */
`;
const CategoryTitle = styled(Heading)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 0.3s;
  display: block;
  letter-spacing: var(--letter-space-md);
  line-height: var(--line-md);
  text-transform: uppercase;
  font-weight: bold;
  width: fit-content;
  padding-bottom: 0.7rem;
  color: var(--color-brand-300);
  &::before {
    content: "";
    position: absolute;
    width: 5rem;
    height: 2px;
    border-radius: 50%;
    background-color: var(--color-brand-300);
    left: -6rem;
    top: 50%;
    transform: translateY(-50%);
  }
  &::after {
    content: "";
    position: absolute;
    width: 5rem;
    height: 2px;
    border-radius: 50%;
    background-color: var(--color-brand-300);
    right: -6rem;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    color: var(--color-brand-500);
  }
`;
const CategoryImageDescription = styled.div`
  padding: 1rem;
  transition: all 0.3s;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  gap: 1.3rem;
  /* &::after{
    content:' ';
    display:block;
    position:absolute;
    width:80%;
    height:3px;
    background-color:var(--color-brand-300);
    border-top:1px solid var(--color-brand-300)
    border-bottom:1px solid var(--color-brand-300)
    left:0;
    bottom:0;
    z-index:10;
  } */
  & > * {
    flex: 1;
  }
  ${media(breakpoints.sm)} {
    flex-direction: ${({ isImageLeft }) =>
      isImageLeft ? "row-reverse" : "row"};

    padding: 3rem;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${media(breakpoints.sm)} {
    justify-content: ${({ isImageEnd }) =>
      isImageEnd ? "flex-end" : "flex-start"};

    padding: 3rem;
  }
`;
const Image = styled.img`
  width: 80%;
  border-radius: 12px;
  border: 12px solid var(--color-grey-300);
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: center;
  line-height: 1.6;
  position: relative;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;

  ${media(breakpoints.sm)} {
    text-align: left;
    gap: 3rem;
  }
  ${media(breakpoints.md)} {
    gap: 5rem;
    line-height: 1.8;
    font-size: 2rem;
  }
`;
const Details = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  gap: 3rem;
  color: var(--color-brand-300);
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: capitalize;
  ${media(breakpoints.sm)} {
    justify-content: flex-start;
    gap: 3rem;
  }
  & > span {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -0.7rem;
      height: 70%;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      background-color: var(--color-brand-300);

      background-color: ${({ color }) => `var(--color-${color}-700)`};
    }
  }
`;
const DescriptionHeading = styled(Heading)`
  font-size: 1.8rem;
  font-weight: normal;
  text-transform: Capitalize;
  ${media(breakpoints.sm)} {
    font-size: 2.3rem;
  }
`;
const StyledCategory = styled.div`
  position: relative;
  margin-bottom: 3rem;
  &::after {
    content: " ";
    display: block;
    position: absolute;
    width: 60%;
    height: 1px;
    background-color: var(--color-brand-300);

    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 10;
  }
  ${media(breakpoints.sm)} {
  }
`;
const CategoryButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.3rem;
  background-color: transparent;
  color: var(--color-grey-600);
  border: 1px solid var(--color-brand-300);
  &:hover {
    color: var(--color-grey-100);
  }
`;
export default function Category({ category, images }) {
  const navigate = useNavigate();
  return (
    <StyledCategory>
      <CategoryTitle as="h3">{category}</CategoryTitle>
      <StyledCategoryContainer>
        {images.map((image, i) => (
          <CategoryImageDescription key={image.id} isImageLeft={i % 2 === 0}>
            <ImageContainer isImageEnd={i % 2 === 0}>
              <Image src={image.src} />
            </ImageContainer>
            <DescriptionContainer>
              <Details>
                <span style={{ color: "var(--color-green-700)" }} color="green">
                  {image.discount
                    ? formatCurrency(
                        Math.floor(
                          image.price - (image.price * image.discount) / 100
                        )
                      )
                    : formatCurrency(image.price)}
                </span>
                {image.discount !== 0 && (
                  <span
                    style={{ color: "var(--color-green-700)" }}
                    color="green"
                  >
                    {image.discount}% off
                  </span>
                )}
                <span
                  style={{ color: "var(--color-indigo-700)" }}
                  color="indigo"
                >
                  {image.width}&quot;&times;{image.height}&quot;
                </span>

                <span
                  style={{
                    color: image.soldOut
                      ? "var(--color-red-700)"
                      : "var(--color-green-700)",
                  }}
                  color={`${image.soldOut}?'red':'green'`}
                >
                  {image.soldOut ? "Sold Out" : "In Store"}{" "}
                </span>
              </Details>
              <div>
                <DescriptionHeading as="h4">
                  How is it Made ?
                </DescriptionHeading>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit ratione magni dignissimos quisquam, quae sequi,
                  soluta nam animi earum non consectetur alias.
                </p>
              </div>
              <div>
                <DescriptionHeading as="h4">
                  what Is special About it ?
                </DescriptionHeading>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Necessitatibus dolorum odio numquam accusamus, deleniti
                  reprehenderit?
                </p>
              </div>
            </DescriptionContainer>
          </CategoryImageDescription>
        ))}
      </StyledCategoryContainer>
      <CategoryButton onClick={() => navigate("/search")}>
        Explore All {category.toUpperCase()}
      </CategoryButton>
    </StyledCategory>
  );
}