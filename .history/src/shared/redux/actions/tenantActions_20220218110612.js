import {
    FETCH_TENANTS,
    ADD_TENANTS,
    DELETE_TENANTS,
    UPDATE_TENANTS,
    FETCH_CATEGORYITEMS,
    FETCH_TENANT_CONFIG,
  } from "./types";
  import api from "../../services/api"
  import Swal from "sweetalert2";
  
  
  
  
  
  
  export const fetchTenants = ()  => (dispatch) => {
    return api
      .get("/tenants?search=status&value=true")
      .then((res) => res.data)
      .then((tenants) =>
        dispatch({
          type: FETCH_TENANTS,
          payload: tenants,
        })
      );
  };
  
  


  export const fetchTenantInfo = ()  => (dispatch) => {
    const host = window.location.host; // gets the full domain of the app
		const sub_domain = host.split('.')[0];
			// .slice(0, host.includes("localhost") ? -1 : -2);
    

    return api
      .get(`/tenants?sub_domain_id=${sub_domain}`)
      .then((res) => res.data)
      .then((tenantitems) =>{
        dispatch({
          type: FETCH_TENANT_CONFIG,
          payload: tenantitems,
        })
        // console.log(tenantitems.data)
      }

      );
  };
  
  export const fetchTenantItemsN = (id)  => (dispatch) => {
    return api
      .get(`/tenants/${id}/items?search=decommission&value=false`)
      .then((res) => res.data)
      .then((tenantitems) =>
        dispatch({
          type: FETCH_CATEGORYITEMS,
          payload: tenantitems,
        })
      );
  };
  export const createTenant = (postData) => (dispatch) => {
    return api
      .post("/tenants", postData)
      .then((post) => {
        if (post.status === 201) {
          dispatch(
            {
              type: ADD_TENANTS,
              payload: post,
            },
            Swal.fire({
              title: "Tenant added successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: post.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  
  export const editTenant = (id,updateData) => (dispatch) => {
    return api
      .patch(`/tenants/${id}`, updateData)
      .then((update) => {
        if (update.status === 200) {
          dispatch(
            {
              type: UPDATE_TENANTS,
              payload: update,
            },
            Swal.fire({
              title: "Tenant updated successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: update.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  
  
  
  export const disableTenant = (id,updateData) => (dispatch) => {
    return api
      .patch(`/tenants/${id}`, updateData)
      .then((update) => {
        if (update.status === 200) {
          dispatch(
            {
              type: UPDATE_TENANTS,
              payload: update,
            },
            Swal.fire({
              title: "Tenant has been removed",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: update.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  export const deleteTenant = (id) => (dispatch) => {
    return api
      .delete(`/tenants/${id}`)
      .then((remove) => {
        if (remove.status === 200) {
          dispatch(
            {
              type: DELETE_TENANTS,
              payload: remove,
            },
            Swal.fire({
              title: "Tenant has been permanently removed",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: remove.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  