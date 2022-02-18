import { useNavigate } from "react-router-dom";

export const NavButton = () => {
  const navigate = useNavigate();

  return navigate("users");
};
