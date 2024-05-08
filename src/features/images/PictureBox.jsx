import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import ButtonIcon from "../../ui/ButtonIcon";
// import { breakpoints } from "../../utils/variables";
import { MdOutlineAddShoppingCart, MdOutlineReadMore } from "react-icons/md";
import useAddToCart from "../../hooks/useAddToCart";
import { useStoredCart } from "../../contexts/StoredCartContext";

const PictureBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: center;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-50);
  padding: 2rem;
  border-radius: var(--border-radius-md);
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
  position: relative;
  perspective: 500px;
`;
const Image = styled.img`
  width: 100%;
  /* max-height: 100%; */
  transform: translateZ(0);
  transition: 0.2s;

  display: block;
  @keyframes scale-on {
    to {
      transform: translateZ(20px);
    }
  }
  &:hover {
    animation: scale-on 0.3s ease forwards;
  }
`;
const PictureBoxDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.5rem;
    /* max-width: 350px;
    max-height: 440px; */

    width: 100%;
  }
  & > div:first-child {
    color: var(--color-grey-600);
    text-transform: capitalize;
    letter-spacing: 2px;
    & > h5 {
      text-transform: uppercase;
    }
  }

  & > div:nth-child(even) {
    background-color: var(--color-grey-100);
  }
  & > div:nth-child(odd) {
    background-color: var(--color-grey-200);
  }
  & > div:nth-child(2) {
    color: var(--color-grey-500);
    font-size: var(--font-md);
  }
  & > div:last-child {
    background-color: transparent;
    /* flex-direction: column; */

    /* color: var(--color-grey-500);
    font-size: 0.85rem; */
  }
`;
const EditedButtonIcon = styled(ButtonIcon)`
  background-color: var(--color-grey-50);
`;
export default function PictureBox({ picture }) {
  const { id, title, price, width, height, discount, soldOut, src, category } =
    picture;
  const currentPath = useLocation().pathname;
  const { setStoredCart } = useStoredCart();
  // console.log(currentPath);
  const { handleAddToCart } = useAddToCart(id);
  function handleClick() {
    handleAddToCart();
    setStoredCart(JSON.parse(localStorage.getItem("cart")));
  }
  return (
    <PictureBoxContainer>
      <PictureBoxImage>
        <Image
          src={src}
          alt={`Image ${title}`}
          className={soldOut ? "half-opacity" : ""}
        ></Image>
      </PictureBoxImage>

      <PictureBoxDetails>
        <div>
          <h4>{title}</h4>
          <h5>{category}</h5>
        </div>
        <div>
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
          {!soldOut ? (
            discount ? (
              <p>
                <span
                  style={{
                    color: "var(--color-red-700)",
                    fontSize: "1.2rem",
                    textDecoration: "line-through",
                    fontWeight: "bold",
                    display: "inline-block",
                    marginRight: "2rem",
                  }}
                >
                  {formatCurrency(price)}
                </span>
                <span
                  style={{
                    color: "var(--color-green-700)",
                    fontSize: "1.4rem",

                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {formatCurrency(price - (price * discount) / 100)}
                </span>
              </p>
            ) : (
              <p>
                <span>{formatCurrency(price)}</span>
              </p>
            )
          ) : (
            <p>
              <span style={{ color: "var(--color-grey-500)" }}>Sold Out</span>
            </p>
          )}
        </div>
        <div style={{}}>
          {!soldOut ? (
            <EditedButtonIcon onClick={handleClick}>
              <span>Add</span>
              <MdOutlineAddShoppingCart />
            </EditedButtonIcon>
          ) : (
            <span
              style={{
                color: "var(--color-red-700)",
                fontSize: "1.4rem",

                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              Sold Out
            </span>
          )}
          <Link to={`${currentPath}/${id}`}>
            <EditedButtonIcon>
              <span>Details</span>
              <MdOutlineReadMore />
            </EditedButtonIcon>
          </Link>
        </div>
      </PictureBoxDetails>
    </PictureBoxContainer>
  );
}
