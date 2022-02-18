import { createBrowserHistory } from "history";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let history = createBrowserHistory();
    let params = useParams();
    return (
      <Component {...props} router={{ location, navigate, params, history }} />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
