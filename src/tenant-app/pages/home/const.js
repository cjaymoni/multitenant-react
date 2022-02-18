import { useNavigate } from "react-router-dom";

export const NavButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/users")}>Clllclc</button>;
};
