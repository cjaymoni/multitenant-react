import { useNavigate, useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export const RedirectUrl = (loca) => {
  let navigate = useNavigate();
  return navigate(`${loca}`);
};
