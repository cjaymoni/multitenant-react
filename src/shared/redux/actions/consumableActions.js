import api from "../../services/api";
import Swal from "sweetalert2";
import { consumablesActionTypes } from "./types";

export const fetchConsumables = () => (dispatch) => {
  return (
    dispatch({ type: consumablesActionTypes.FETCH_CONSUMABLES }),
    api
      .get("/consumables")
      .then((res) => res.data)
      .then((assets) =>
        dispatch({
          type: consumablesActionTypes.FETCH_CONSUMABLES_SUCCESS,
          payload: assets,
        })
      )
      .catch((error) => {
        dispatch({
          type: consumablesActionTypes.FETCH_CONSUMABLES_ERROR,
          payload: error,
        });
      })
  );
};

export const fetchConsumableById = (id) => (dispatch) => {
  return api
    .get(`/consumables/${id}`)
    .then((res) => res.data)
    .then((asset) =>
      dispatch({
        type: consumablesActionTypes.FETCH_CONSUMABLE_BY_ID,
        payload: asset,
      })
    );
};

export const createConsumable = (postData) => (dispatch) => {
  return api({
    method: "post",
    url: "/consumables",
    data: postData,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${postData._boundary}`,
    },
  }).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: consumablesActionTypes.ADD_CONSUMABLE_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Consumable added successfully",
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

export const editConsumable = (id, updateData) => (dispatch) => {
  return api.patch(`/consumables/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: consumablesActionTypes.UPDATE_CONSUMABLE_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Consumable updated successfully",
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

export const deleteConsumable = (id) => (dispatch) => {
  return api.delete(`/consumables/${id}`).then((del) => {
    if (del.status === 204) {
      dispatch(
        {
          type: consumablesActionTypes.DELETE_CONSUMABLE_SUCCESS,
          payload: del,
        },
        Swal.fire({
          title: "Consumable has been removed",
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
        text: del.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};
