import { FETCH_TENANT_CONFIG } from "../redux/actions/types";
import store from "../redux/store/store";
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
async function getConfig(dispatch) {
  const host = window.location.host; // gets the full domain of the app
  const sub_domain = host.split(".")[0];

  try {
    return await api
      .get(`/tenants?sub_domain_id=${sub_domain}`)
      .then((res) => res.data)
      .then((tenantitems) => {
        dispatch({
          type: FETCH_TENANT_CONFIG,
          payload: tenantitems,
        });
        console.log(tenantitems.data);
      });
  } catch (error) {}
}

// async function loadBackground(){
//  const configuration =  await props.tenantConfig
// return (this.backgroundOne = props.tenantConfig.backgroundImage);
// }
export { getConfig };

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
