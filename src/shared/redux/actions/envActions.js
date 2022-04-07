import api from "../../services/api";
import Swal from "sweetalert2";
import { envActions } from "./types";

export const fetchConfigurations = () => (dispatch) => {
  return api
    .get("/configurations?safe=true")
    .then((res) => res.data)
    .then((configurations) =>
      dispatch({
        type: envActions.FETCH_ENV_CONFIG_SUCCESS,
        payload: configurations,
      })
    );
};

export const createConfiguration = (postData) => (dispatch) => {
  return api.post("/configurations", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: envActions.ADD_ENV_CONFIG_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Configuration added successfully",
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

export const updateConfiguration = (id, updateData) => (dispatch) => {
  return api.patch(`/configurations/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: envActions.UPDATE_ENV_CONFIG_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Configuration updated successfully",
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

export const disableConfiguration = (id, updateData) => (dispatch) => {
  return api.patch(`/configurations/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: envActions.UPDATE_ENV_CONFIG_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Configuration has been removed",
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

export const deleteConfiguration = (id) => (dispatch) => {
  return api.delete(`/configurations/${id}`).then((remove) => {
    if (remove.status === 204) {
      dispatch(
        {
          type: envActions.DELETE_ENV_CONFIG_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Configuration has been permanently removed",
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
