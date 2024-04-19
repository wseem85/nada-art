import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Account() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "3rem",
        alignItems: "center",
      }}
    >
      <h1>Account Page ... Not Done Yet</h1>
      <Button variation="secondary" size="large" onClick={() => navigate(-1)}>
        &larr; Go Back
      </Button>
    </div>
  );
}
