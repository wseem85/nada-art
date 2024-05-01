// import styled from "styled-components";
// import { format, isToday } from "date-fns";
// import {
//   HiArrowDownOnSquare,
//   HiArrowUpOnSquare,
//   HiEye,
//   HiTrash,
// } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { formatCurrency, media } from "../../utils/helpers";
import { breakpoints } from "../../utils/variables";
import ButtonIcon from "../../ui/ButtonIcon";
// import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Modal from "../../ui/Modal";
// import Menus from "../../ui/Menus";
// import ConfirmDelete from "../../ui/ConfirmDelete";

// import { formatCurrency } from "../../utils/helpers";
// import { formatDistanceFromNow } from "../../utils/helpers";
// import { useCheckout } from "../check-in-out/useCheckout";
// import { useDeleteImage } from "./useDeleteImage";

// const Title = styled.div`
//   font-size: 1.4rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;
// const Category = styled.div`

// `
// const Dimenitions= styled.div`

// `
// const
// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;

//   & span:first-child {
//     font-weight: 500;
//   }

//   & span:last-child {
//     color: var(--color-grey-500);
//     font-size: 1.2rem;
//   }
// `;

// const Amount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
// `;
const Image = styled.div`
  width: 60px;
  height: 60px;
`;
const Title = styled.div`
  display: none;
  ${media(breakpoints.pmd)} {
    display: block;
  }
`;
const Dimenitions = styled.div`
  display: none;
  ${media(breakpoints.pmd)} {
    display: block;
  }
`;
const Category = styled.div`
  display: none;
  ${media(breakpoints.pmd)} {
    display: block;
  }
`;
const Discount = styled.div`
  display: none;
  ${media(breakpoints.xs)} {
    display: block;
  }
`;
const Availability = styled.div`
  display: none;
  ${media(breakpoints.xs)} {
    display: block;
  }
`;
// const EditButton = styled(ButtonIcon)`
//   display: flex;
//   align-items: center;
//   gap: 0.6rem;
//   & > span {
//     font-weight: bold;
//     color: var(--color-brand-300);
//   }
//   & > svg {
//     width: 2.5rem;
//     height: 2.5rem;
//     color: var(--color-brand-300);
//   }
//   &:hover {
//     > span {
//       color: var(--color-grey-100);
//     }
//     > svg {
//       color: var(--color-grey-100);
//     }
//   }
// `;
function ImageRow({
  image: { id, src, title, price, discount, soldOut, dimenitions, category },
}) {
  // const navigate = useNavigate();
  // const currentPath = useLocation().pathname;

  // function handleClickEdit() {
  //   navigate(`/account/image/${id}`);
  // }
  return (
    <Table.Row>
      <Image>
        <img
          src={src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ></img>
      </Image>
      <Title>{title}</Title>
      <Category>{category}</Category>
      <Dimenitions>{dimenitions}</Dimenitions>
      <div>{formatCurrency(price - Math.floor((price * discount) / 100))}</div>
      <Discount>{discount ? `${discount}%` : `-`}</Discount>
      <Availability
        style={
          soldOut === true
            ? { color: "var(--color-brand-500)" }
            : { color: "var(--color-green-700)" }
        }
      >
        {soldOut === true ? "Sold out" : "In store"}
      </Availability>
      <Link to={`/account/image/${id}`}>
        <ButtonIcon>
          <span> Edit </span>
          <MdOutlineEdit />
        </ButtonIcon>
      </Link>
    </Table.Row>
  );
}
{
  /* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={imageId} />
          <Menus.List id={imageId}>
            <Mewidthn
              iheightdth}
              opriceht> navigate(`/bookings/${imageId}`price             Swidths
            </Mheighprice           {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${imageId}`)}
              >
        widthheight/Menus.Buttonprice            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(imageId)}
                disabled={isCheckingwidth>
                Cheheight              </Menus.Buttonprice            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(imageId)}
          />
        </Modwidth>
      </height    </Table.Row> */
}

export default ImageRow;
