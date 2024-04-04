import { Link } from "react-router-dom";
import { SlArrowRightCircle } from "react-icons/sl";

import styled from "styled-components";
const StyledContainer = styled.div`
  height: 300px;
  width: 250px;
  border: 1px solid var(--color-brand-100);
  padding: 3rem;
  background-color: var(--color-brand-50);
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.3rem;
  &:hover {
    background-color: var(--color-brand-100);
    box-shadow: var(--shadow-md);
  }
`;
const CategoryTitle = styled.span`
  transition: background-color 0.3s;
  display: block;
  letter-spacing: var(--letter-space-md);
  line-height: var(--line-md);
  text-transform: uppercase;
  font-weight: bold;
  width: fit-content;
  padding-bottom: 0.7rem;
  color: var(--color-brand-300);
  border-bottom: 2px solid var(--color-brand-300);

  &:hover {
    color: var(--color-brand-500);
  }
`;
const Icon = styled.span`
  /* width: 3rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 3rem; */
  /* border-radius: 50%; */
  background-color: var(--color-brand-1000);
  color: var(--color-brand-500);
  font-weight: bold;
  /* font-size: ; */
  position: relative; /* Needed for animation with translate */
  animation: move 0.5s infinite linear;
  @keyframes move {
    0% {
      transform: translateX(0); /* Start at the left edge */
    }
    50% {
      transform: translateX(
        3px
      ); /* Move to the right edge, considering element width */
    }
    100% {
      transform: translateX(0); /* Go back to left edge */
    }
  }
`;
export default function CategoryBox({ category }) {
  return (
    <Link>
      <StyledContainer>
        {category.img && (
          <img
            src={category.img}
            alt={`image-${category.category}}`}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        <div style={{ display: "flex", gap: "0.7rem" }}>
          <CategoryTitle>{category.category}</CategoryTitle>
          <Icon>
            <SlArrowRightCircle />
          </Icon>
        </div>
      </StyledContainer>
    </Link>
  );
}
