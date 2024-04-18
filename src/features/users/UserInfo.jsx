import UserAvatar from "../authentication/UserAvatar";

export default function UserInfo({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  );
}
