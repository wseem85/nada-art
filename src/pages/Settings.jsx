import { useAllImages as useAllImagesQuery } from "../features/images/useAllImages";
// import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePassword, MdUpload } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { compareDesc, parseISO } from "date-fns";
import styled from "styled-components";
// import { PicturesContainer } from "./Originals";
// import { useQueryClient } from "@tanstack/react-query";
// import PictureBox from "../features/images/PictureBox";
import { useEffect, useState } from "react";
import Table from "../ui/Table";
import ImageRow from "../features/images/ImageRow";
import ButtonIconText from "../ui/ButtonIconText";
import Modal from "../features/images/Modal";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import withScrollToTop from "../ui/withScroolToTop";
import Heading from "../ui/Heading";
// import Paragraph from "../ui/Paragraph";
// import Row from "../ui/Row";
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
  padding-left: 2rem;
  padding-right: 2rem;
  /* min-height: 100vh; */
`;
const AccountSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1rem 1.4rem;
`;
function SettingsComponent() {
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
        <Heading as="h2" style={{ textAlign: "center" }}>
          Welcom back,{" "}
          {currentUser?.user_metadata?.fullName ||
            currentUser?.user_metadata?.display_name}
        </Heading>
        <AccountSettings>
          <Heading
            as="h3"
            style={{
              borderBottom: "1px solid var(--color-grey-200)",
              paddingBottom: "1.3rem",
            }}
          >
            Settings{" "}
          </Heading>
          <Modal>
            <Modal.Open opens="change-name">
              <ButtonIconText>
                <span>Change User Data</span>
                <FaUserPen />
              </ButtonIconText>
            </Modal.Open>

            <Modal.Open opens="change-password">
              <ButtonIconText>
                <span>Change Password</span>
                <MdOutlinePassword />
              </ButtonIconText>
            </Modal.Open>

            <Modal.Window name="change-name">
              <UpdateUserDataForm />
            </Modal.Window>
            <Modal.Window name="change-password">
              <UpdatePasswordForm />
            </Modal.Window>
          </Modal>
          {isSuperUser && (
            <>
              <Modal>
                <Modal.Open opens="new-product">
                  <ButtonIconText>
                    <span>Uploade New Product</span>
                    <MdUpload />
                  </ButtonIconText>
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
                <Paragraph>
                  {" "}
                  As an owner of this Web app You can{" "}
                  <span
                    style={{
                      color: "var(--color-green-700)",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </span>{" "}
                  or{" "}
                  <span
                    style={{
                      color: "var(--color-red-700)",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </span>{" "}
                  any product through going to Image page first by clicking{" "}
                  <mark>
                    options <IoMdOptions />
                  </mark>{" "}
                  button down in any of the elements that you want to edit or
                  delete, after that you can do the editing by clicking edit or
                  delete buttons 0n the product page.
                </Paragraph>
                <Heading as="h3">A List Of All Products</Heading>
              </div>
            </>
          )}
        </AccountSettings>

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
        <Heading as="h3">You are not signed in ! </Heading>
        <Heading as="h3">
          Please Log in if you have an account , or you can create an account
          any time ..
        </Heading>
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.3rem",
            display: "flex",
            gap: "1.3rem",
            flexDirection: "column",
          }}
        >
          <Link
            style={{
              textDecoration: "underline",
              color: "var(--color-brand-700)",
              fontWeight: "bold",
              display: "inline-block",
            }}
            to="/signup"
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "var(--color-green-700)",
              }}
            >
              create an account
            </p>
          </Link>{" "}
          <p>Already have an account? </p>
          <Link
            style={{
              textDecoration: "underline",
              color: "var(--color-green-700)",
              fontWeight: "bold",
              display: "block",
            }}
            to="/login"
          >
            <span
              style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}
            >
              Login
            </span>
          </Link>
        </div>
        <Heading as="h4">By having an account you will be able to :</Heading>
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
      </AccountPageContainer>
    );
}
const Settings = withScrollToTop(SettingsComponent);
export default Settings;
