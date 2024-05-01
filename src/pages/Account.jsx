import { useAllImages as useAllImagesContext } from "../contexts/AllImagesContext";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";

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
const AccountPageContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
  align-items: center;
  min-height: 100vh;
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
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const [isSuperUser, setIsSuperUser] = useState(false);
  const { currentUser } = useCurrentUser();

  const { allImages } = useAllImagesContext();

  useEffect(
    function () {
      setIsSuperUser(currentUser?.user_metadata?.is_superuser);
    },
    [isSuperUser, currentUser]
  );
  return (
    <AccountPageContainer>
      {currentUser ? (
        <>
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

          {isSuperUser && !isXSmallScreen && (
            <Table columns=" 1fr 1fr  1fr">
              <Table.Header>
                <div>Pic</div>
                <div>Price</div>
                <div>Action</div>
              </Table.Header>
              <Table.Body
                data={allImages}
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
                data={allImages}
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
                data={allImages}
                render={(image) => <ImageRow key={image.id} image={image} />}
              ></Table.Body>
            </Table>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </AccountPageContainer>
  );
}
const Account = withScrollToTop(AccountComponent);
export default Account;
