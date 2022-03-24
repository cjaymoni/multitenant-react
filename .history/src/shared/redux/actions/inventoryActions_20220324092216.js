import api from "../../services/api";
import Swal from "sweetalert2";
import { inventoryActions } from "./types";

export const fetchInventories = () => (dispatch) => {
  return api
    .get("/inventories")
    .then((res) => res.data)
    .then((inventories) =>
      dispatch({
        type: inventoryActions.FETCH_INVENTORY_SUCCESS,
        payload: inventories,
      })
    );
};

export const createInventory = (postData) => (dispatch) => {
  return api.post("/inventories", postData).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: inventoryActions.ADD_INVENTORY_SUCCESS,
          payload: post,
        },
        Swal.fire({
          title: "Inventory added successfully",
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

export const editInventory = (id, updateData) => (dispatch) => {
  return api.patch(`/inventories/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: inventoryActions.UPDATE_INVENTORY_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Inventory updated successfully",
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

export const disableInventory = (id, updateData) => (dispatch) => {
  return api.patch(`/inventories/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: inventoryActions.DELETE_INVENTORY_SUCCESS,
          payload: update,
        },
        Swal.fire({
          title: "Inventory has been removed",
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
export const deleteInventory = (id) => (dispatch) => {
  return api.delete(`/inventories/${id}`).then((remove) => {
    if (remove.status === 204) {
      dispatch(
        {
          type: inventoryActions.DELETE_INVENTORY_SUCCESS,
          payload: remove,
        },
        Swal.fire({
          title: "Inventory has been permanently removed",
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

export const fetchInventoryAssets = () => (dispatch) => {
  return api
    .get(`/inventories/${localStorage.inv_id}/assets`)
    .then((res) => res.data)
    .then((inventoryasset) =>
      dispatch({
        type: inventoryActions.FETCH_INVENTORY_ASSETS,
        payload: inventoryasset,
      })
    );
};

export const fetchInventoryRequests = () => (dispatch) => {
  return api
    .get(`/inventories/${localStorage.inv_id}/requests`)
    .then((res) => res.data)
    .then((inventoryRequests) =>
      dispatch({
        type: inventoryActions.FETCH_INVENTORY_REQUESTS,
        payload: inventoryRequests,
      })
    );
};

export const fetchInventoryProposals = () => (dispatch) => {
  return api
    .get(`/inventories/${localStorage.inv_id}/proposals`)
    .then((res) => res.data)
    .then((inventoryProposals) =>
      dispatch({
        type: inventoryActions.FETCH_INVENTORY_PROPOSALS,
        payload: inventoryProposals,
      })
    );
};

export const fetchInventoryDetails = (id) => (dispatch) => {
  return api
    .get(`/inventories/${id}`)
    .then((res) => res.data)
    .then((inventorydetails) =>
      dispatch({
        type: inventoryActions.FETCH_INVENTORY_DETAILS,
        payload: inventorydetails,
      })
    );
};

export const addToInventory = (id, itemid) => (dispatch) => {
  return api.put(`/inventories/${id}/items`, [itemid]).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: inventoryActions.ADD_TO_INVENTORY,
          payload: update,
        },
        Swal.fire({
          title: "Success",
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

export const deleteFromInventory = (delid, id) => (dispatch) => {
  return api
    .delete(`/inventories/${id}/items`, {
      data: [delid],
    })
    .then((del) => {
      if (del.status === 200) {
        dispatch(
          {
            type: inventoryActions.DELETE_FROM_INVENTORY,
            payload: del,
          },
          Swal.fire({
            title: "Asset has been removed",
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
          title: "Failed",
          timer: 2000,
          showConfirmButton: false,
          text: del.data,
        });
      }
    });
};
