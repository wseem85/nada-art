import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency, media } from "../../utils/helpers";
import ButtonIconText from "../../ui/ButtonIconText";
// import { breakpoints } from "../../utils/variables";
import {
  MdOutlineAddShoppingCart,
  MdOutlineExpandMore,
  MdOutlineExpandLess,
  MdOutlineReadMore,
} from "react-icons/md";
import useAddToCart from "../../hooks/useAddToCart";
import { useStoredCart } from "../../contexts/StoredCartContext";
import { breakpoints } from "../../utils/variables";
import { RxDimensions } from "react-icons/rx";
import { CgUnavailable } from "react-icons/cg";
import {
  MdOutlineTitle,
  MdOutlineCategory,
  MdOutlinePriceCheck,
} from "react-icons/md";
import { useState } from "react";
import useOutSideClick from "../../hooks/useOutsideClick";

const PictureBoxContainer = styled.div`
  display: flex;
  font-size: 75%;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: center;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-50);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  // position: relative;
  position: relative;

  ${media("350px")} {
    max-width: 160px;
  }
  ${media("400px")} {
    max-width: 190px;
  }
  ${media("450px")} {
    max-width: 200px;
  }
  ${media(breakpoints.xs)} {
    max-width: unset;
    font-size: 100%;
  }
  ${media(breakpoints.sm)} {
    font-size: 100%;
  }
`;
// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--color-brand-xsmallTransparency);
// `;
const PictureBoxImage = styled.div`
  perspective: 500px;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 5/6;
  overflow: hidden;
  /* max-height: 100%; */
  transform: translateZ(0);
  transition: 0.2s;

  display: block;
`;
const PictureBoxDetails = styled.div`
  /* font-size: 70%; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 90%;
  ${media(breakpoints.xs)} {
    font-size: 100%;
  }
  /* justify-content: center; */
  gap: 0.8rem;
  /* min-height: 140px; */
  padding: 0.7rem;
  position: absolute;
  top: 0;

  width: 100%;
  /* height: fit-content; */
  color: white;
  background-color: var(--color-brand-xsmallTransparency);
  height: 80%;

  @keyframes change-height {
    from {
      height: 0;
    }
    to {
      height: 80%;
    }
  }
  animation: change-height 0.1s linear;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    padding: 0.3rem 0.5rem;
    /* max-width: 350px;
    max-height: 440px; */

    width: 100%;
  }
  & > div > div {
    display: flex;
    gap: 0.7rem;
    align-items: center;
  }
  & > div > div > span {
    display: inline-block;
    font-weight: bold;
    /* color: var(--color-green-700); */
  }
  & > div > div > span > svg {
    width: 1.7rem;
    height: 1.7rem;
    ${media("350px")} {
      width: 1.3rem;
      height: 1.3rem;
    }
    ${media("450px")} {
      width: 1.7rem;
      height: 1.7rem;
    }
    /* color: var(--color-green-700); */
  }
  & > div:first-child {
    /* color: var(--color-brand-900); */
    text-transform: capitalize;
    /* letter-spacing: 1px; */
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    & > h5 {
      /* color: var(--color-brand-800); */
      text-transform: uppercase;
    }
  }
`;
const StyledShowDetailsButton = styled(ButtonIconText)`
  position: absolute;
  padding: 0.3rem 0.5rem;
  top: 0;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 0;

  & > svg {
    color: var(--color-brand-300);
  }
  &:hover {
    border: none;
    background-color: var(--color-brand-300);
    color: var(--color-grey-100);
    svg {
      color: var(--color-grey-100);
    }
  }
  &:hover::after {
    display: block;
  }
`;
const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 1.3rem;
  justify-content: space-between;
  align-items: center;
`;
export default function PictureBox({ picture }) {
  const { id, title, price, width, height, discount, soldOut, src, category } =
    picture;
  const [showDetails, setShowDeatails] = useState(false);
  const [showDetailsButton, setShowDeatailsButton] = useState(true);
  const ref = useOutSideClick(close);
  const currentPath = useLocation().pathname;
  const { setStoredCart } = useStoredCart();
  // console.log(currentPath);
  const { handleAddToCart } = useAddToCart(id);
  function handleClick() {
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }
  function handleShowImageDetails() {
    setShowDeatails((show) => !show);
    setShowDeatailsButton((show) => !show);
  }
  function close() {
    setShowDeatails(false);
    setShowDeatailsButton(true);
  }
  return (
    <PictureBoxContainer>
      <PictureBoxImage>
        {showDetailsButton && (
          <StyledShowDetailsButton onClick={handleShowImageDetails}>
            <MdOutlineExpandMore />
          </StyledShowDetailsButton>
        )}
        <Image
          src={src}
          alt={`Image ${title}`}
          className={soldOut ? "half-opacity" : ""}
        ></Image>
        {showDetails && (
          <PictureBoxDetails ref={ref}>
            <div>
              <div>
                <span>
                  <MdOutlineTitle />
                </span>
                <h4>{title}</h4>
              </div>
              <div>
                <span>
                  <MdOutlineCategory />
                </span>
                <h5>{category}</h5>
              </div>
            </div>
            <div>
              <div>
                <span>
                  <RxDimensions />
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <p style={{ letterSpacing: "1px" }}>{width}&quot;</p>
                  <p>&times;</p>
                  <p>{height}&quot;</p>
                </div>
              </div>
              {soldOut && (
                <div>
                  <span>
                    <CgUnavailable />
                  </span>
                  <p>
                    <span>Sold Out</span>
                  </p>
                </div>
              )}

              {!soldOut && discount !== 0 && (
                <div style={{ maxWidth: "100%" }}>
                  <span>
                    <MdOutlinePriceCheck />
                  </span>
                  <p style={{ display: "flex", flexWrap: "wrap" }}>
                    <span
                      style={{
                        textDecoration: "line-through",

                        display: "inline-block",
                      }}
                    >
                      {formatCurrency(price)}
                    </span>
                    <span>/</span>
                    <span
                      style={{
                        display: "inline-block",
                        fontWeight: "bold",
                      }}
                    >
                      {formatCurrency(price - (price * discount) / 100)}
                    </span>
                  </p>
                </div>
              )}
              {!soldOut && !discount && (
                <div>
                  <span>
                    <MdOutlinePriceCheck />
                  </span>
                  <p>
                    <span>{formatCurrency(price)}</span>
                  </p>
                </div>
              )}
            </div>
            <div>
              <StyledShowDetailsButton
                style={{ top: "unset", bottom: "0" }}
                onClick={handleShowImageDetails}
              >
                <MdOutlineExpandLess />
              </StyledShowDetailsButton>
            </div>
          </PictureBoxDetails>
        )}
      </PictureBoxImage>

      <StyledButtonsContainer>
        {!soldOut ? (
          <ButtonIconText onClick={handleClick}>
            <span>Add</span>
            <MdOutlineAddShoppingCart />
          </ButtonIconText>
        ) : (
          <span
            style={{
              color: "var(--color-red-700)",

              display: "inline-block",
            }}
          >
            Sold Out
          </span>
        )}
        <Link to={`${currentPath}/${id}`}>
          <ButtonIconText>
            <span>Details</span>
            <MdOutlineReadMore />
          </ButtonIconText>
        </Link>
      </StyledButtonsContainer>
    </PictureBoxContainer>
  );
}
