import { tenantActions } from "../redux/actions/types";
// import store from "../redux/store/store";
import api from "./api";
// import axiosInstance from './axiosSetup';

// async function getConfig(){
//   const host = window.location.host; // gets the full domain of the app
//   const sub_domain = host.split('.')[0];
//   // console.log(sub_domain)
//   try {
//     return await api.get(`/tenants`, {
//       params: {
//         sub_domain_id:sub_domain
//       }
//     }).then(function(response){
//       // store.dispatch({ type: 'FETCH_TENANT_CONFIG', tenantConfig: response.data.data[0] });
//       console.log(response.data.data[0])
//       return response
//   });
//   } catch(e){
//     let resp = e.response.data
//     return (resp )
//   }
// }
var isSubdomain = function (url) {
  url = url || "http://www.test-domain.com"; // just for the example
  var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);

  return !!url.match(regex); // make sure it returns boolean
};

export const getConfig = () => async (dispatch) => {
  const host = window.location.host; // gets the full domain of the app
  var sub_domain = host.split(".")[0];
  if (sub_domain === "admin") {
    return true;

    // (window.location.host = "admin.localhost:3000");
  } else if (host.indexOf(".") === -1) {
    window.location = `http://admin.${host}`;
  } else if (host.includes(".") && sub_domain !== "admin") {
    try {
      return await api
        .get(`/tenants?sub_domain=${sub_domain}`)
        .then((res) => res.data)
        .then((tenantitems) => {
          dispatch({
            type: tenantActions.FETCH_TENANT_CONFIG,
            payload: tenantitems,
          });
          console.log(tenantitems.data);
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    return (sub_domain = "admin");
  }
};

// async function getConfig(dispatch) {
//   const host = window.location.host; // gets the full domain of the app
//   const sub_domain = host.split(".")[0];

//   try {
//     return await api
//       .get(`/tenants?sub_domain_id=${sub_domain}`)
//       .then((res) => res.data)
//       .then((tenantitems) => {
//         dispatch({
//           type: tenantActions.FETCH_TENANT_CONFIG,
//           payload: tenantitems,
//         });
//         console.log(tenantitems.data);
//       });
//   } catch (error) {}
// }

// async function loadBackground(){
//  const configuration =  await props.tenantConfig
// return (this.backgroundOne = props.tenantConfig.backgroundImage);
// }

// export default connect(null, { someAction })(MyComponent);
// export { getConfig };

// TEnantFOrm.propTypes = {
//   tenantConfig: PropTypes.array.isRequired,
// };
// const mapStateToProps = (state) => {
//   const { tenantConfig } = state.tenant.tenantConfig;
//   return {
//     tenantConfig,
//   };
// };
// export default connect(mapStateToProps,null)(TEnantFOrm);
