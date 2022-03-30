import api from "../../services/api";
import Swal from "sweetalert2";
import { subscriptionActions } from "./types";

export const fetchSubscriptions = () => (dispatch) => {
  return api
    .get("/subscriptions")
    .then((res) => res.data)
    .then((subscriptions) =>
      dispatch({
        type: subscriptionActions.FETCH_SUBSCRIPTIONS_SUCCESS,
        payload: subscriptions,
      })
    );
};

export const createSubscription = (postData) => (dispatch) => {
  return api.post("/subscriptions", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: subscriptionActions.ADD_SUBSCRIPTIONS_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Subscription added successfully",
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

export const updateSubscription = (id, updateData) => (dispatch) => {
  return api.patch(`/subscriptions/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: subscriptionActions.UPDATE_SUBSCRIPTIONS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Subscription updated successfully",
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

export const disableSubscription = (id, updateData) => (dispatch) => {
  return api.patch(`/subscriptions/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: subscriptionActions.UPDATE_SUBSCRIPTIONS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Subscription has been removed",
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

export const deleteSubscription = (id) => (dispatch) => {
  return api.delete(`/subscriptions/${id}`).then((remove) => {
    if (remove.status === 204) {
      dispatch(
        {
          type: subscriptionActions.DELETE_SUBSCRIPTIONS_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Subscription has been permanently removed",
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
