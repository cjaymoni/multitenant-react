import Swal from "sweetalert2";
import api from "../../services/api";
import { transferAction } from "./types";

export const transferAsset = (updateData, id) => (dispatch) => {
  return api.patch(`/items/${id}`, updateData).then((transfer) => {
    if (transfer.status === 200) {
      dispatch(
        {
          type: transferAction.TRANSFER_ASSET_SUCCESS,
          payload: transfer,
        },
        Swal.fire({
          title: "Transfer successful",
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
        text: transfer.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const transferInventory = (updateData, id) => (dispatch) => {
  return api.patch(`/inventories/${id}`, updateData).then((transfer) => {
    if (transfer.status === 200) {
      dispatch(
        {
          type: transferAction.TRANSFER_INVENTORY_SUCCESS,
          payload: transfer,
        },
        Swal.fire({
          title: "Transfer successful",
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
        text: transfer.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};
