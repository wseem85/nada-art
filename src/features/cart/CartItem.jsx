// import { useDispatch } from "react-redux";
// import { deleteItem } from "./cartSlice";
import styled from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon";
import { formatCurrency, media } from "../../utils/helpers";
// import { IoBagRemoveOutline } from "react-icons/io5";
import { breakpoints } from "../../utils/variables";
// import useDeleteProduct from "./useDeleteProduct";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import { useStoredCart } from "../../contexts/StoredCartContext";
// import Button from "../../ui/Button";
const StyledCartItem = styled.div`
  background-color: var(--color-brown-50);
  padding: 1.3rem 2.3rem;
  display: flex;

  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  font-size: 70%;
  ${media(breakpoints.xs)} {
    justify-content: flex-start;
    gap: 2.5rem;
  }
  & > img {
    max-height: 50px;
    aspect-ratio: 2/3;
    object-fit: cover;
  }
`;
export default function CartItem({ item }) {
  // const { isDeleting, deleteProduct } = useDeleteProduct();
  const { setStoredCart } = useStoredCart();
  const dispatch = useDispatch();

  const isDeleting = false;
  function handleDeleteProduct() {
    dispatch(deleteItem(item.id));
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }
  return (
    <StyledCartItem>
      <img src={item.src} />
      <span>{item.title}</span>
      <span>{formatCurrency(item.price)}</span>
      <ButtonIcon
        style={{
          backgroundColor: "transparent",
          color: "var(--color-red-700)",
          marginLeft: "auto",
        }}
        onClick={handleDeleteProduct}
      >
        {isDeleting ? <SpinnerMini /> : <span>Remove</span>}
        {/* <IoBagRemoveOutline /> */}
      </ButtonIcon>
    </StyledCartItem>
  );
}
