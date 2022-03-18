import api from "../../services/api";
import Swal from "sweetalert2";
import { departmentActions } from "./types";
export const fetchDepartments = () => (dispatch) => {
  return api
    .get("/departments")
    .then((res) => res.data)
    .then((departments) =>
      dispatch({
        type: departmentActions.FETCH_DEPARTMENTS_SUCCESS,
        payload: departments,
      })
    );
};

export const createDepartment = (postData) => (dispatch) => {
  return api.post("/departments", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: departmentActions.ADD_DEPARTMENTS_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Department added successfully",
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

export const editDepartment = (id, updateData) => (dispatch) => {
  return api.patch(`/departments/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: departmentActions.UPDATE_DEPARTMENTS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Department updated successfully",
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

export const disableDepartment = (id, updateData) => (dispatch) => {
  return api.patch(`/departments/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: departmentActions.UPDATE_DEPARTMENTS_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Department has been removed",
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
export const deleteDepartment = (id) => (dispatch) => {
  return api.delete(`/departments/${id}`).then((remove) => {
    if (remove.status === 200) {
      dispatch(
        {
          type: departmentActions.DELETE_DEPARTMENTS_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Department has been  permanently removed ",
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
