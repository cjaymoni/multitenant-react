import api from "../../services/api"
import {FETCH_INVENTORIES,FETCH_INVENTORYDETAILS, FETCH_INVENTORYASSETS,UPDATE_INVENTORIES,ADD_INVENTORIES,DELETE_INVENTORIES,
ADD_TOINVENTORIES,DELETE_FROMINVENTORIES } from "./types";
import Swal from "sweetalert2";

export const fetchInventories = () =>dispatch =>{
    return api.get ('/inventories?search=status&value=true')
    .then(res => res.data)
   .then(inventories =>
        dispatch({
            type: FETCH_INVENTORIES,
            payload: inventories
        }));

}



export const createInventory= (postData) => (dispatch) => {
    return api
      .post("/inventories", postData)
      .then((post) => {
        if (post.status === 201) {
          dispatch(
            {
              type: ADD_INVENTORIES,
              payload: post,
            },
            Swal.fire({
              title: "Inventory added successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: post.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  
  export const editInventory = (id,updateData) => (dispatch) => {
    return api
      .patch(`/inventories/${id}`, updateData)
      .then((update) => {
        if (update.status === 200) {
          dispatch(
            {
              type: UPDATE_INVENTORIES,
              payload: update,
            },
            Swal.fire({
              title: "Inventory updated successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: update.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  
    
  export const disableInventory = (id,updateData) => (dispatch) => {
    return api
      .patch(`/inventories/${id}`, updateData)
      .then((update) => {
        if (update.status === 200) {
          dispatch(
            {
              type: UPDATE_INVENTORIES,
              payload: update,
            },
            Swal.fire({
              title: "Inventory has been removed",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: update.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  export const deleteInventory = (id) => (dispatch) => {
    return api
      .delete(`/inventories/${id}`)
      .then((remove) => {
        if (remove.status === 200) {
          dispatch(
            {
              type: DELETE_INVENTORIES,
              payload: remove,
            },
            Swal.fire({
              title: "Inventory has been permanently removed",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            }).then(function(){ 
              window.location.reload();
          })
          );
        } else {
          Swal.fire({
            icon: "error",
            text: remove.data,
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  };
  
export const fetchInventoryAssets = () =>dispatch=> {
    return api.get(`/inventories/${localStorage.inv_id}/items?search=available&value=true`)
    .then(res => res.data)
   .then(inventoryasset =>
        dispatch({
            type: FETCH_INVENTORYASSETS,
            payload: inventoryasset
        }));

}

export const fetchInventoryDetails = (id) =>dispatch=> {
  return api.get(`/inventories/${id}`)
  .then(res => res.data)
 .then(inventorydetails =>
      dispatch({
          type: FETCH_INVENTORYDETAILS,
          payload: inventorydetails
      }));

}

export const addToInventory = (id,itemid)=> dispatch => {
  return api.put(`/inventories/${id}/items`,[itemid])
  .then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: ADD_TOINVENTORIES,
          payload: update,
        },
        Swal.fire({
          title: "Success",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(function(){ 
          window.location.reload();
      })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: update.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
};

export const deleteFromInventory = (delid,id)=> dispatch => {
  return api.delete(`/inventories/${id}/items`,{
    data:
      [delid]
    
  })
  .then((del) => {
    if (del.status === 200) {
      dispatch(
        {
          type: DELETE_FROMINVENTORIES,
          payload: del,
        },
        Swal.fire({
          title: "Asset has been removed",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(function(){ 
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