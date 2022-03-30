import api from "../../services/api";
import Swal from "sweetalert2";
import { subscriptionPackageActions } from "./types";

export const fetchSubscriptionPackages = () => (dispatch) => {
  return api
    .get("/subscriptions/packages")
    .then((res) => res.data)
    .then((subscriptions) =>
      dispatch({
        type: subscriptionPackageActions.FETCH_SUBSCRIPTION_PACKAGE_SUCCESS,
        payload: subscriptions,
      })
    );
};

export const createSubscriptionPackage = (postData) => (dispatch) => {
  return api.post("/subscriptions/packages", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: subscriptionPackageActions.ADD_SUBSCRIPTION_PACKAGE_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Subscription Package added successfully",
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

export const updateSubscriptionPackage = (id, updateData) => (dispatch) => {
  return api
    .patch(`/subscriptions/packages/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: subscriptionPackageActions.UPDATE_SUBSCRIPTION_PACKAGE_SUCCESS,
            payload: update,
          },
          Swal.fire({
            icon: "success",
            title: "Subscription Package updated successfully",
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

export const disableSubscriptionPackage = (id, updateData) => (dispatch) => {
  return api
    .patch(`/subscriptions/packages/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: subscriptionPackageActions.UPDATE_SUBSCRIPTION_PACKAGE_SUCCESS,
            payload: update,
          },
          Swal.fire({
            icon: "success",
            title: "Subscription Package has been removed",
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

export const deleteSubscriptionPackage = (id) => (dispatch) => {
  return api.delete(`/subscriptions/packages/${id}`).then((remove) => {
    if (remove.status === 204) {
      dispatch(
        {
          type: subscriptionPackageActions.DELETE_SUBSCRIPTION_PACKAGE_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Subscription Package has been permanently removed",
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
