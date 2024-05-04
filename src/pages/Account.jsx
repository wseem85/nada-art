import { useAllImages as useAllImagesQuery } from "../features/images/useAllImages";
// import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePassword, MdUpload } from "react-icons/md";
import { compareDesc, parseISO } from "date-fns";
import styled from "styled-components";
// import { PicturesContainer } from "./Originals";
// import { useQueryClient } from "@tanstack/react-query";
// import PictureBox from "../features/images/PictureBox";
import { useEffect, useState } from "react";
import Table from "../ui/Table";
import ImageRow from "../features/images/ImageRow";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "../features/images/Modal";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import withScrollToTop from "../ui/withScroolToTop";
import Heading from "../ui/Heading";
// import Paragraph from "../ui/Paragraph";
import Row from "../ui/Row";
import EditImageForm from "../features/images/EditImageForm";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { StyledLogo } from "../ui/Logo";
import Paragraph from "../ui/Paragraph";
const AccountPageContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
  align-items: center;
  /* min-height: 100vh; */
`;
const AccountSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1rem 1.4rem;
`;
function AccountComponent() {
  // const navigate = useNavigate();
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth >= 991
  );
  const [isXSmallScreen, setIsXSmallScreen] = useState(
    () => window.innerWidth >= 550
  );
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 991);
      setIsXSmallScreen(window.innerWidth >= 550);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSuperUser, setIsSuperUser] = useState(
    currentUser?.user_metadata?.is_superuser
  );

  const { allImages, isLoading: isLoadingAllImages } = useAllImagesQuery();
  const sortedImages = allImages?.sort((obj1, obj2) => {
    const date1 = parseISO(obj1.created_at);
    const date2 = parseISO(obj2.created_at);

    // Use compareDesc for ascending order (latest to earliest)
    // Use compareAsc for descending order (earliest to latest)
    return compareDesc(date1, date2);
  });
  useEffect(
    function () {
      setIsSuperUser(currentUser?.user_metadata?.is_superuser);
    },
    [isSuperUser, currentUser]
  );
  if (isLoadingAllImages || isLoadingCurrentUser) return <Spinner />;
  if (currentUser) {
    return (
      <AccountPageContainer>
        <h3>
          Welcom back,{" "}
          {currentUser?.user_metadata?.fullName ||
            currentUser?.user_metadata?.display_name}
        </h3>
        <AccountSettings>
          <Modal>
            <Modal.Open opens="change-name">
              <ButtonIcon>
                <span>Update User Data</span>
                <FaUserPen />
              </ButtonIcon>
            </Modal.Open>

            <Modal.Open opens="change-password">
              <ButtonIcon>
                <span>Update Password</span>
                <MdOutlinePassword />
              </ButtonIcon>
            </Modal.Open>

            <Modal.Window name="change-name">
              <UpdateUserDataForm />
            </Modal.Window>
            <Modal.Window name="change-password">
              <UpdatePasswordForm />
            </Modal.Window>
          </Modal>
        </AccountSettings>

        {isSuperUser && (
          <Row type="vertical">
            <Modal>
              <Modal.Open opens="new-product">
                <ButtonIcon>
                  <span>Uploade Product</span>
                  <MdUpload />
                </ButtonIcon>
              </Modal.Open>

              <Modal.Window name="new-product">
                <EditImageForm />
              </Modal.Window>
            </Modal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.2rem",
                padding: "2rem",
              }}
            >
              <Heading as="h3">A List Of All Products</Heading>
              <p>You can edit any product by clicking edit button</p>
            </div>
          </Row>
        )}

        {isSuperUser && !isXSmallScreen && (
          <Table columns=" 1fr 1fr  1fr">
            <Table.Header>
              <div>Pic</div>
              <div>Price</div>
              <div>Action</div>
            </Table.Header>
            <Table.Body
              data={sortedImages}
              render={(image) => <ImageRow key={image.id} image={image} />}
            ></Table.Body>
          </Table>
        )}
        {isSuperUser && isXSmallScreen && !isSmallScreen && (
          <Table columns=" 1fr 1fr  1fr 1fr 1fr ">
            <Table.Header>
              <div>Pic</div>
              <div>Price</div>
              <div>Discount</div>
              <div>Availability</div>
              <div>Action</div>
            </Table.Header>
            <Table.Body
              data={sortedImages}
              render={(image) => <ImageRow key={image.id} image={image} />}
            ></Table.Body>
          </Table>
        )}
        {isSuperUser && isSmallScreen && (
          <Table columns=" 1fr 2fr  1fr 1fr 1fr 1fr 1fr 1fr  ">
            <Table.Header>
              <div>Pic</div>
              <div>Title</div>
              <div>Category</div>
              <div>Dimenitions</div>
              <div>Price</div>
              <div>Discount</div>
              <div>Availability</div>
              <div>Action</div>
            </Table.Header>
            <Table.Body
              data={sortedImages}
              render={(image) => <ImageRow key={image.id} image={image} />}
            ></Table.Body>
          </Table>
        )}
      </AccountPageContainer>
    );
  }
  if (!currentUser)
    return (
      <AccountPageContainer>
        <StyledLogo>Nada art</StyledLogo>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ullam
          sint id nulla eligendi corporis dolor tempora natus, reiciendis
          quisquam dolore impedit quam ratione reprehenderit corrupti obcaecati
          perferendis blanditiis aut.
        </Paragraph>
        <Heading as="h3">By having an account you will be able to </Heading>
        <ol style={{ padding: "1rem 2rem", listStyleType: "circle" }}>
          <li style={{ marginLeft: "1rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            natus.
          </li>
          <li style={{ marginLeft: "1rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            natus.
          </li>
          <li style={{ marginLeft: "1rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            natus.
          </li>
        </ol>
        <Link
          style={{
            textDecoration: "underline",
            color: "var(--color-brand-700)",
            fontWeight: "bold",
          }}
          to="/signup"
        >
          <span style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}>
            create an account
          </span>
        </Link>{" "}
        <span>
          Already have an account{" "}
          <Link
            style={{
              textDecoration: "underline",
              color: "var(--color-brand-700)",
              fontWeight: "bold",
            }}
            to="/login"
          >
            <span
              style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}
            >
              sign in
            </span>
          </Link>
        </span>
      </AccountPageContainer>
    );
}
const Account = withScrollToTop(AccountComponent);
export default Account;
