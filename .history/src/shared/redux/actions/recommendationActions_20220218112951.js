import api from "../../services/api";
import Swal from "sweetalert2";
import { priorityActions, recommendationActions } from "./types";

export const fetchRecommendations = () => (dispatch) => {
  return api
    .get("/proposals")
    .then((res) => res.data)
    .then((recommendations) =>
      dispatch({
        type: recommendationActions.FETCH_RECOMMENDATION_SUCCESS,
        payload: recommendations,
      })
    );
};
export const fetchPriorities = () => (dispatch) => {
  return api
    .get("/priorities")
    .then((res) => res.data)
    .then((priorities) =>
      dispatch({
        type: priorityActions.FETCH_PRIORITY_SUCCESS,
        payload: priorities,
      })
    );
};
export const fetchUserRecommendations = () => (dispatch) => {
  return api
    .get(`/proposals/?search=author_id&value=${localStorage.user_id}`)
    .then((res) => res.data)
    .then((userproposal) =>
      dispatch({
        type: recommendationActions.FETCH_USER_RECOMMENDATION,
        payload: userproposal,
      })
    );
};
export const fetchDepartmentRecommendations = () => (dispatch) => {
  return api
    .get(`proposals/?search=department_id&value=${localStorage.department_id}`)
    .then((res) => res.data)
    .then((departmentproposal) =>
      dispatch({
        type: recommendationActions.FETCH_DEPARTMENT_RECOMMENDATION,
        payload: departmentproposal,
      })
    );
};

export const createRecommendation = (postData) => (dispatch) => {
  return api.post("/proposals", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: recommendationActions.ADD_RECOMMENDATION_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Recommendation added successfully.",
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

export const editRecommendation = (id, updateData) => (dispatch) => {
  return api.patch(`/proposals/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: recommendationActions.UPDATE_RECOMMENDATION_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Recommendation updated successfully",
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

export const deleteRecommendation = (id, deleteData) => (dispatch) => {
  return api.delete(`/proposals/${id}`, deleteData).then((remove) => {
    if (remove.status === 200) {
      dispatch(
        {
          type: recommendationActions.DELETE_RECOMMENDATION_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Recommendation has been removed",
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
