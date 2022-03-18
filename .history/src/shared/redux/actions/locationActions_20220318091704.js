import api from "../../services/api";
import Swal from "sweetalert2";
import { locationActions } from "./types";
export const fetchLocation = () => (dispatch) => {
  return api
    .get("/branches")
    .then((res) => res.data)
    .then((location) =>
      dispatch({
        type: locationActions.FETCH_LOCATION_SUCCESS,
        payload: location,
      })
    );
};

export const fetchLocationDepartments = (id) => (dispatch) => {
  return api
    .get(`/locations/${id}/departments?search=status&value=true`)
    .then((res) => res.data)
    .then((departmentlocation) =>
      dispatch({
        type: locationActions.FETCH_DEPARTMENT_LOCATION,
        payload: departmentlocation,
      })
    );
};
export const fetchLocDepartments = () => (dispatch) => {
  return api
    .get(
      `/locations/${localStorage.loc_id}/departments?search=status&value=true`
    )
    .then((res) => res.data)
    .then((departmentlocation) =>
      dispatch({
        type: locationActions.FETCH_DEPARTMENT_LOCATION,
        payload: departmentlocation,
      })
    );
};
export const createLocation = (postData) => (dispatch) => {
  return api.post("/branches", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: locationActions.ADD_LOCATION_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Branch added successfully",
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

export const updateLocation = (id, updateData) => (dispatch) => {
  return api.patch(`/locations/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: locationActions.UPDATE_LOCATION_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Branches updated successfully",
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

export const disableLocation = (id, updateData) => (dispatch) => {
  return api.patch(`/locations/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: locationActions.DELETE_LOCATION_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Branches has been removed",
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

export const deleteLocation = (id) => (dispatch) => {
  return api.delete(`/locations/${id}`).then((remove) => {
    if (remove.status === 200) {
      dispatch(
        {
          type: locationActions.DELETE_LOCATION_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Branches has been permanently removed",
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
