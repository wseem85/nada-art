import styled from "styled-components";
// import { createPortal } from "react-dom";
// import { useSelector } from "react-redux";
// import { getCart } from "./cartSlice";
// import { useCurrentUser } from "../../contexts/CurrentUserProvider";
import { media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
import { useAppNav } from "../../contexts/AppNavContext";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";
// import { useUserCart } from "./useUserCart";
// import { useAllImages } from "../images/useAllImages";
import { useAllImages } from "../../contexts/AllImagesContext";
// import useUser from "../authentication/useUser";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";
// import Spinner from "../../ui/Spinner";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
// import { useLocalStorageState } from "../../hooks/useLocalStorage";
// import { useEffect } from "react";
import { useStoredCart } from "../../contexts/StoredCartContext";
// import useOutSideClick from "../../hooks/useOutsideClick";
// import { createPortal } from "react-dom";
const CartContainer = styled.div`
  overflow: scroll;
  font-size: inherit;

  position: fixed;
  /* overflow: auto; */
  z-index: 88;
  top: 50px;
  right: 0;
  min-height: 20rem;
  background-color: var(--color-brown-0);
  width: 100vw;
  transition: 0.5s;
  height: 100vh;
  /* max-height: 70vh; */
  box-shadow: var(--shadow-lg);

  transform: translateY(-100%);
  animation: move-in 0.2s linear forwards;
  @keyframes move-in {
    to {
      transform: translateY(0);
    }
  }
  ${media(breakpoints.sm)} {
    width: 70vw;
    top: 58.5px;
  }
  ${media(breakpoints.pmd)} {
    width: 50vw;
    top: 58.5px;
  }
`;
const StyledCart = styled.div`
  padding: 1.3rem 1.3rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  /* overflow: visible; */
  /* font-size: inherit; */

  /* padding: 1.3rem 1.3rem 3rem; */
  /* position: fixed; */
  /* overflow: auto; */
  /* z-index: 88; */
  /* top: 50px; */
  /* right: 0; */
  /* min-height: 20rem; */
  /* background-color: var(--color-brown-0); */
  /* width: 100vw; */
  /* transition: 0.5s; */
  /* height: 500px; */
  /* box-shadow: var(--shadow-lg); */
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 1.3rem; */
  /* transform: translateY(-100%); */
  /* animation: move-in 0.2s linear forwards; */
  /* @keyframes move-in { */
  /* to { */
  /* transform: translateY(0); */
  /* } */
  /* } */
  /* ${media(breakpoints.sm)} { */
  /* width: 70vw; */
  /* top: 58.5px; */
  /* } */
  /* ${media(breakpoints.pmd)} { */
  /* width: 50vw; */
  /* top: 58.5px; */
  /* } */

  /* transition: height 0.3s; */
`;

const StyledCartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledCartBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  ${media(breakpoints.xs)} {
  }
  ${media(breakpoints.pmd)} {
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.3rem;
  & > button:first-child {
    align-self: flex-end;
  }
`;
export default function Cart() {
  const { setCartIsOpen } = useAppNav();
  const { storedCart, setStoredCart } = useStoredCart();

  const { currentUser: user } = useCurrentUser();
  const { error, allImages, isLoading: isLoadingAllImages } = useAllImages();
  const dispatch = useDispatch();
  if (isLoadingAllImages) return <p>Loading</p>;
  // const { isLoading: isLoadingCart, error, carts } = useUserCart(user?.id);

  const imagesInCartIds = storedCart?.map((item) => item.image_id);

  const imagesInCart = allImages?.filter((image) =>
    imagesInCartIds?.includes(image.id)
  );
  function handleClearCart() {
    dispatch(clearCart());
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }

  if (error) return <p>Something went wrong</p>;
  if (storedCart?.length === 0)
    return (
      <CartContainer>
        <StyledCart>
          <StyledCartHeader>
            <Heading as="h3">Your Cart Is Empty</Heading>
            <ButtonIcon
              onClick={() => setCartIsOpen(false)}
              style={{
                backgroundColor: "transparent",
                fontSize: "2rem",
              }}
            >
              x
            </ButtonIcon>
          </StyledCartHeader>
        </StyledCart>
      </CartContainer>
    );

  if (storedCart?.length)
    return (
      <CartContainer>
        <StyledCart>
          <StyledCartHeader>
            <Heading as="h3">
              Your Cart, {user?.user_matadata?.fullName}{" "}
            </Heading>
            <ButtonIcon
              onClick={() => setCartIsOpen(false)}
              style={{
                backgroundColor: "transparent",
                fontSize: "2rem",
              }}
            >
              x
            </ButtonIcon>
          </StyledCartHeader>
          <StyledCartBody>
            {imagesInCart?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </StyledCartBody>
          <Buttons>
            <Button variation="secondary" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button variation="primary" size="large">
              Checkout
            </Button>
          </Buttons>
        </StyledCart>
      </CartContainer>
    );
}
