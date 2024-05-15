import styled from "styled-components";
// import useUser from "./useUser";
// import Logout from "./Logout";
// import Login from "./Login";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-brand-700);
`;

const Avatar = styled.img`
  display: block;
  width: 2.3rem;
  width: 2.3rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar({ user }) {
  //   const { user } = useUser();

  const { display_name: fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />

      {/* <Logout /> */}
    </StyledUserAvatar>
  );
}
