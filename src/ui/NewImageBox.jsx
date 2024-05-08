import styled, { css } from "styled-components";
import { formatCurrency } from "../utils/helpers";
import Button from "./Button";
import useAddToCart from "../hooks/useAddToCart";
import { useStoredCart } from "../contexts/StoredCartContext";
/*
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import toast from "react-hot-toast";
*/
const StyledNewImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Image = styled.img`
  width: 100%;
  ${(props) =>
    props.soldOut === true &&
    css`
      opacity: 0.5;
    `}
`;
const Sale = styled.p`
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
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
    props.soldOut &&
    css`
      color: var(--color-red-700);
    `}
`;
export default function NewImageBox({ image }) {
  const { id } = image || {};
  const { handleAddToCart } = useAddToCart(id);
  const { setStoredCart } = useStoredCart();
  function handleClick() {
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
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
          <Sale sale={image.discount} soldOut={image.soldOut}>
            {image.soldOut ? "Sold Out" : `Sale ${image.discount}%`}
          </Sale>
        ) : (
          ""
        )}
        <Image src={image.src} soldOut={image.soldOut} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ flex: "1", fontSize: "1.35rem" }}>{image.title}</h3>
        {!image.soldOut && image.discount !== 0 && (
          <>
            <p
              style={{
                color: "var(--color-brand-400)",
                textDecoration: "line-through",

                fontWeight: "700",
                marginLeft: "5rem",
                marginRight: "1.5rem",
              }}
            >
              {formatCurrency(image.price)}
            </p>
            <p
              style={{
                color: "var(--color-green-700)",
                fontWeight: "700",
              }}
            >
              {formatCurrency(
                image.price - (image.price * image.discount) / 100
              )}
            </p>
          </>
        )}
        {!image.soldOut && !image.discount && (
          <p
            style={{
              color: "var(--color-grey-700)",
              fontWeight: "600",
            }}
          >
            {formatCurrency(image.price)}
          </p>
        )}

        {image.soldOut && (
          <p
            style={{
              color: "var(--color-grey-700)",
              fontWeight: "600",
            }}
          >
            {formatCurrency(
              image.discount
                ? image.price - (image.price * image.discount) / 100
                : image.price
            )}
          </p>
        )}
      </div>

      <Button size="large" variation="primary" onClick={handleClick}>
        {image.soldOut ? "Search Similars" : "Add To Cart"}
      </Button>
    </StyledNewImageBox>
  );
}
