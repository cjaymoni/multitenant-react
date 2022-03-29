import api from "../../services/api";
import Swal from "sweetalert2";
import { requestActions } from "./types";

export const fetchRequests = () => (dispatch) => {
  return api
    .get("/request")
    .then((res) => res.data)
    .then((requests) =>
      dispatch({
        type: requestActions.FETCH_REQUEST_SUCCESS,
        payload: requests,
      })
    );
};

export const fetchUserRequests = () => (dispatch) => {
  return api
    .get(`users/${localStorage.user_id}/request`)
    .then((res) => res.data)
    .then((userrequests) =>
      dispatch({
        type: requestActions.FETCH_USER_REQUEST,
        payload: userrequests,
      })
    );
};
export const fetchDepartmentRequests = () => (dispatch) => {
  return api
    .get(`departments/${localStorage.department_id}/request`)
    .then((res) => res.data)
    .then((departmentrequest) =>
      dispatch({
        type: requestActions.FETCH_DEPARTMENT_REQUEST,
        payload: departmentrequest,
      })
    );
};

export const issueRequest = (issueData) => (dispatch) => {
  return api.post("/request", issueData).then((issue) => {
    if (issue.status === 201) {
      dispatch(
        {
          type: requestActions.ISSUE_REQUEST_SUCCESS,
          payload: issue,
        },
        Swal.fire({
          title: "Request sent successfully.",
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
        text: issue.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const issueHeadRequest = (issueData) => (dispatch) => {
  return api.post("/request", issueData).then((issue) => {
    if (issue.status === 201) {
      dispatch(
        {
          type: requestActions.ISSUE_REQUEST_SUCCESS,
          payload: issue,
        },
        localStorage.setItem("request_id", issue.data.id)
        //  console.log(issue.data)
      );
    } else {
      Swal.fire({
        icon: "error",
        text: issue.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const editRequest = (updateData, id) => (dispatch) => {
  return api.patch(`/request/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: requestActions.UPDATE_REQUEST_SUCCESS,
          payload: update,
        },
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Verification Successful",
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
