import {
  FETCH_VENDORS,
  ADD_VENDORS,
  DELETE_VENDORS,
  UPDATE_VENDORS,
  ADDVEN_CATEGORY
} from "./types";
import api from "../../services/api"
import Swal from "sweetalert2";
export const fetchVendors = () => (dispatch) => {
  return api
    .get("/vendors?search=status&value=true")
    .then((res) => res.data)
    .then((vendors) =>
      dispatch({
        type: FETCH_VENDORS,
        payload: vendors,
      })
    );
};

export const createVendor = (postData) => (dispatch) => {
  return api
    .post("/vendors", postData)
    .then((post) => {
      if (post.status === 201) {
        dispatch(
          {
            type: ADD_VENDORS,
            payload: post,
          },
          Swal.fire({
            title: "Vendor added successfully",
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

export const addVenCategory = (catid,venid) =>(dispatch)=>{
  return api.put(`/categories/${catid}/vendors`,[venid]
 
  )
  .then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: ADDVEN_CATEGORY,
          payload: update,
        },
        Swal.fire({
          title: "Category added successfully",
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

export const editVendor = ( id,updateData) => (dispatch) => {
  return api
    .patch(`/vendors/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: UPDATE_VENDORS,
            payload: update,
          },
          Swal.fire({
            title: "Vendor updated successfully",
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


export const disableVendor = ( id,updateData) => (dispatch) => {
  return api
    .patch(`/vendors/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: UPDATE_VENDORS,
            payload: update,
          },
          Swal.fire({
            title: "Vendor has been removed",
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

export const deleteVendor = (id) => (dispatch) => {
  return api
    .delete(`/vendors/${id}`)
    .then((remove) => {
      if (remove.status === 200) {
        dispatch(
          {
            type: DELETE_VENDORS,
            payload: remove,
          },
          Swal.fire({
            title: "Vendor has been permanently removed",
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
    })
    .catch((error) => {
      console.log(error.response);
    });
};
