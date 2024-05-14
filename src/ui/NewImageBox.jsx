import styled, { css } from "styled-components";
import { formatCurrency, media } from "../utils/helpers";
import { MdOutlineAddShoppingCart, MdOutlineSearch } from "react-icons/md";
import useAddToCart from "../hooks/useAddToCart";
import { useStoredCart } from "../contexts/StoredCartContext";
import { useNavigate } from "react-router-dom";
import ButtonIconText from "./ButtonIconText";
import { breakpoints } from "../utils/variables";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { getIsLoading } from "../features/cart/cartSlice";
// import SpinnerMini from "./SpinnerMini";
/*
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import toast from "react-hot-toast";
*/
const StyledNewImageBox = styled.div`
  padding: 0.8rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 100vw;
  background-color: var(--color-grey-50);
  & > button {
    margin-left: auto;
    margin-right: auto;
  }
`;
const Image = styled.img`
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
  aspect-ratio: 5/6;
  overflow: hidden;
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-pic);
  ${(props) =>
    props.soldOut === true &&
    css`
      opacity: 0.5;
    `}
`;
const Sale = styled.p`
  width: 60px;
  height: 20px;
  font-size: 70%;
  line-height: 20px;
  text-align: center;
  ${media(breakpoints.xs)} {
    width: 80px;
    height: 25px;
    font-size: 80%;
    line-height: 25px;
  }
  ${media(breakpoints.sm)} {
    width: 100px;
    height: 30px;
    font-size: 100%;
    line-height: 30px;
  }
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--color-grey-50);
  ${(props) =>
    props.sale &&
    css`
      color: var(--color-green-700);
    `}
  ${(props) =>
    props.soldout &&
    css`
      color: var(--color-red-700);
    `}
`;
const StyledImageDetailsContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: flex-start;
  font-size: 70%;
  ${media(breakpoints.xs)} {
    font-size: 80%;
  }
  ${media(breakpoints.xs)} {
    font-size: 100%;
  }
  & > div {
    display: flex;
    gap: 1.3rem;
  }

  /* justify-content: flex-start; */
`;
export default function NewImageBox({ image }) {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const { id } = image || {};
  const { handleAddToCart } = useAddToCart(id);
  const { setStoredCart } = useStoredCart();

  function handleClick() {
    // setIsLoading((is) => !is);
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
    // setIsLoading((is) => !is);
  }
  /*
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id || "";
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  function handleAddToCart() {
    if (cart.find((el) => el.image_id === id)) {
      toast("This Product is Already in Your Cart");
      return;
    }

    const newProduct = { image_id: id, user_id: userId };

    dispatch(addItem(newProduct));
  }
  */
  return (
    <StyledNewImageBox key={image.title}>
      <div style={{ maxWidth: "350px", position: "relative" }}>
        {image.soldOut || image.discount ? (
          <Sale sale={image.discount} soldout={image.soldOut}>
            {image.soldOut ? "Sold Out" : `Sale ${image.discount}%`}
          </Sale>
        ) : (
          ""
        )}
        <Image src={image.src} soldout={image.soldOut} />
      </div>
      <StyledImageDetailsContainer>
        <h4 style={{ flex: "1", fontSize: "1.55rem" }}>{image.title}</h4>
        {!image.soldOut && image.discount !== 0 && (
          <div>
            <p
              style={{
                color: "var(--color-brand-400)",
                textDecoration: "line-through",

                fontWeight: "500",
              }}
            >
              {formatCurrency(image.price)}
            </p>
            <p
              style={{
                color: "var(--color-green-700)",
                fontWeight: "500",
              }}
            >
              {formatCurrency(
                image.price - (image.price * image.discount) / 100
              )}
            </p>
          </div>
        )}
        {!image.soldOut && !image.discount && (
          <p
            style={{
              color: "var(--color-grey-700)",
              fontWeight: "400",
            }}
          >
            {formatCurrency(image.price)}
          </p>
        )}

        {image.soldOut && (
          <p
            style={{
              color: "var(--color-grey-700)",
              fontWeight: "500",
            }}
          >
            {formatCurrency(
              image.discount
                ? image.price - (image.price * image.discount) / 100
                : image.price
            )}
          </p>
        )}
      </StyledImageDetailsContainer>
      {!image.soldOut && (
        <ButtonIconText onClick={handleClick}>
          <span>Add To Cart</span> <MdOutlineAddShoppingCart />
        </ButtonIconText>
      )}
      {image.soldOut && (
        <ButtonIconText onClick={() => navigate("/search")}>
          <span>Search Similars</span> <MdOutlineSearch />
        </ButtonIconText>
      )}
    </StyledNewImageBox>
  );
}
