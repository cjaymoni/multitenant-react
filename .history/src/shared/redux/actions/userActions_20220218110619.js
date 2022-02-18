import { DELETE_USERS, FETCH_USERS, UPDATE_USERS ,ADD_USERS, FETCH_ROLES, FETCH_DEPARTMENTUSERS, FETCHBY_USERID, BULK_INSERT} from "./types";
import api from "../../services/api"
import Swal from 'sweetalert2'

export const fetchUsers = () =>dispatch =>{
    return api.get ('/users')
    .then(res => res.data)
   .then(users =>
        dispatch({
            type: FETCH_USERS,
            payload: users
        }));

}

export const fetchByUserId = (id) =>dispatch =>{
  return api.get (`/users/${id}`)
  .then(res => res.data)
 .then(user =>
      dispatch({
          type: FETCHBY_USERID,
          payload: user
      }));

}
export const fetchRoles = () =>dispatch =>{
  return api.get ('/roles')
  .then(res => res.data)
 .then(roles =>
      dispatch({
          type: FETCH_ROLES,
          payload: roles
      }));

}

export const fetchDepartmentUsers = (id) =>dispatch=> {
  return api.get(`/users`,{params:{
    department_id:id
  }})
  .then(res => res.data)
 .then(departmentusers =>
      dispatch({
          type: FETCH_DEPARTMENTUSERS,
          payload: departmentusers
      }));

}

export const createUser = (postData) => (dispatch) => {
    return api
      .post("/users", postData)
      .then((post) => {
        if (post.status === 201) {
          dispatch(
            {
              type: ADD_USERS,
              payload: post,
            },
            Swal.fire({
              title: "User added successfully",
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
  

  export const bulkInsert = (postData) => (dispatch) => {
    return api
      .post("/users/bulk-insert", postData)
      .then((post) => {
        if (post.status === 200) {
          dispatch(
            {
              type: BULK_INSERT,
              payload: post,
            },
            Swal.fire({
              title: "Users added successfully",
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
  
  export const editUser = (updateData, id) => (dispatch) => {
    return api
      .patch(`/users/${id}`, updateData)
      .then((update) => {
        if (update.status===200) {
          dispatch(
            {
              type: UPDATE_USERS,
              payload: update,
            },
            Swal.fire({
              title: "User updated successfully",
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
  

  export const disableUser = (updateData, id) => (dispatch) => {
    return api
      .patch(`/users/${id}`, updateData)
      .then((update) => {
        if (update.status===200) {
          dispatch(
            {
              type: UPDATE_USERS,
              payload: update,
            },
            Swal.fire({
              title: "User has been removed",
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
  export const deleteUser = (id) => (dispatch) => {
    return api
      .delete(`/users/${id}`)
      .then((remove) => {
        if (remove.status === 200) {
          dispatch(
            {
              type: DELETE_USERS,
              payload: remove,
            },
            Swal.fire({
              title: "User has been permanently removed",
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
  