import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Search() {
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
      <h1>Search Page ... Not Done Yet</h1>
      <Button variation="secondary" size="large" onClick={() => navigate(-1)}>
        &larr; Go Back
      </Button>
    </div>
  );
}
