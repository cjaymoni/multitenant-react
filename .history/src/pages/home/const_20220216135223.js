import { useLocation, useNavigate } from "react-router-dom";
import history from "../../location";

export const NavButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return <button onClick={() => navigate("users")}>Clllclc</button>;
};
