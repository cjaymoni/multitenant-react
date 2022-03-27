import api from "../../services/api";
import Swal from "sweetalert2";
import { vendorActions } from "./types";
export const fetchVendors = () => (dispatch) => {
  return api
    .get("/vendors")
    .then((res) => res.data)
    .then((vendors) =>
      dispatch({
        type: vendorActions.FETCH_VENDORS_SUCCESS,
        payload: vendors,
      })
    );
};

export const createVendor = (postData) => (dispatch) => {
  return api.post("/vendors", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: vendorActions.ADD_VENDORS_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Supplier added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: post.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};
//196.43.196.108:3100/openapi.json/categories/{resource_id}/append-{resource}
export const addVenCategory = (catid, venid) => (dispatch) => {
  return api
    .put(`/categories/${catid}/append-vendors`, [venid])
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: vendorActions.ADD_VENDOR_CATEGORY,
            payload: update,
          },
          Swal.fire({
            title: "Category added successfully",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(function () {
            window.location.reload();
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          text: update.data,
          title: "Failed",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
};

export const editVendor = (id, updateData) => (dispatch) => {
  return api.patch(`/vendors/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: vendorActions.UPDATE_VENDORS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Supplier updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: update.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const disableVendor = (id, updateData) => (dispatch) => {
  return api.patch(`/vendors/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: vendorActions.UPDATE_VENDORS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Supplier has been removed",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: update.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const deleteVendor = (id) => (dispatch) => {
  return api
    .delete(`/vendors/${id}`)
    .then((remove) => {
      if (remove.status === 204) {
        dispatch(
          {
            type: vendorActions.DELETE_VENDORS_SUCCESS,
            payload: remove,
          },
          Swal.fire({
            title: "Supplier has been permanently removed",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(function () {
            window.location.reload();
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          text: remove.data,
          title: "Failed",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
};
