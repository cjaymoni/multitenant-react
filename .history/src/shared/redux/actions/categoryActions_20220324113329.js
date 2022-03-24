import api from "../../services/api";
import Swal from "sweetalert2";
import { categoryActions } from "./types";

export const fetchCategories = () => (dispatch) => {
  return api
    .get("/categories")
    .then((res) => res.data)
    .then((categories) =>
      dispatch({
        type: categoryActions.FETCH_CATEGORIES_SUCCESS,
        payload: categories,
      })
    );
};

export const fetchCategoryItems = () => (dispatch) => {
  return api
    .get(
      `/categories/${localStorage.cat_id}/items?search=decommission&value=false`
    )
    .then((res) => res.data)
    .then((categoryitems) =>
      dispatch({
        type: categoryActions.FETCH_CATEGORY_ITEMS,
        payload: categoryitems,
      })
    );
};

export const fetchCategoryItemsN = (id) => (dispatch) => {
  return api
    .get(`/categories/${id}/items?search=decommission&value=false`)
    .then((res) => res.data)
    .then((categoryitems) =>
      dispatch({
        type: categoryActions.FETCH_CATEGORY_ITEMS,
        payload: categoryitems,
      })
    );
};
export const createCategory = (postData) => (dispatch) => {
  return api.post("/categories", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: categoryActions.ADD_CATEGORIES_SUCCESS,
          payload: post,
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
        text: post.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const editCategory = (id, updateData) => (dispatch) => {
  return api.patch(`/categories/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: categoryActions.UPDATE_CATEGORIES_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Category updated successfully",
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

export const disableCategory = (id, updateData) => (dispatch) => {
  return api.patch(`/categories/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: categoryActions.UPDATE_CATEGORIES_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Category has been removed",
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
export const deleteCategory = (id) => (dispatch) => {
  return api.delete(`/categories/${id}`).then((remove) => {
    if (remove.status === 204) {
      dispatch(
        {
          type: categoryActions.DELETE_CATEGORIES_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Category has been permanently removed",
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
