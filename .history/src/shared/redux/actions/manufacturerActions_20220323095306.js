import api from "../../services/api";
import Swal from "sweetalert2";
import { manufacturerActions } from "./types";

export const fetchManufacturers = () => (dispatch) => {
  return api
    .get("/manufacturers")
    .then((res) => res.data)
    .then((manufacturers) =>
      dispatch({
        type: manufacturerActions.FETCH_MANUFACTURERS_SUCCESS,
        payload: manufacturers,
      })
    );
};

export const createManufacturer = (postData) => (dispatch) => {
  return api.post("/manufacturers", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: manufacturerActions.ADD_MANUFACTURERS_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Manufacturer added successfully",
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

export const updateManufacturer = (id, updateData) => (dispatch) => {
  return api.patch(`/manufacturers/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: manufacturerActions.UPDATE_MANUFACTURERS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Manufacturer updated successfully",
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

export const disableManufacturer = (id, updateData) => (dispatch) => {
  return api.patch(`/manufacturers/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: manufacturerActions.UPDATE_MANUFACTURERS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Manufacturer has been removed",
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

export const deleteManufacturer = (id) => (dispatch) => {
  return api.delete(`/manufacturers/${id}`).then((remove) => {
    if (remove.status === 200) {
      dispatch(
        {
          type: manufacturerActions.DELETE_MANUFACTURERS_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Manufacturer has been permanently removed",
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
  });
};
