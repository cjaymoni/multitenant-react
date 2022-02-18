import { useNavigate } from "react-router-dom";
import history from "../../location";

export const NavButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("users")}>Clllclc</button>;
};
