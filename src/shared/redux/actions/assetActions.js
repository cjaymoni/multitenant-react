import api from "../../services/api";
import Swal from "sweetalert2";
import { assetActionTypes } from "./types";

export const fetchAvailableAssets = () => (dispatch) => {
  return api
    .get("/items?search=decommission&value=false")
    .then((res) => res.data)
    .then((assets) =>
      dispatch({
        type: assetActionTypes.FETCHAVAILABLE_ASSETS,
        payload: assets,
      })
    );
};
export const fetchAssets = () => (dispatch) => {
  return (
    dispatch({ type: assetActionTypes.FETCH_ASSETS }),
    api
      .get("/assets")
      .then((res) => res.data)
      .then((assets) =>
        dispatch({
          type: assetActionTypes.FETCH_ASSETS_SUCCESS,
          payload: assets,
        })
      )
      .catch((error) => {
        dispatch({ type: assetActionTypes.FETCH_ASSETS_ERROR, payload: error });
      })
  );
};

// export const fetchAssets = () => dispatch => {
//   return api
//     .get('/items')
//     .then(res => res.data)
//     .then(assets =>
//       dispatch({
//         type: FETCH_ASSETS,
//         payload: assets,
//       })
//     );
// };

export const fetchAssetById = (id) => (dispatch) => {
  return api
    .get(`/assets/${id}`)
    .then((res) => res.data)
    .then((asset) =>
      dispatch({
        type: assetActionTypes.FETCH_ASSET_BY_ID,
        payload: asset,
      })
    );
};
// export const fetchAssets = ()=>dispatch => {
//     return api.get ("/items?search=status&value=1")
//         // .then(res => res.data)
//         .then(comments => {
//         dispatch({
//           type: FETCH_ASSETS,
//           payload:comments
//         });
//       });

//   };
// export function fetchAssets() {
//     return dispatch {
//         return api.get ("/items?search=status&value=1")
//         // .then(res => res.data)
//         .then(assets => {
//             // dispatch
//             dispatch({
//                 type: FETCH_ASSETS,
//                 payload: assets
//             });
//         });
//     };
// }

export const fetchNonInventoryAssets = () => (dispatch) => {
  return api
    .get("/items?search=decommission&value=false")
    .then((res) => res.data)
    .then((assets) =>
      dispatch({
        type: assetActionTypes.FETCHNON_INVASSETS,
        payload: assets,
      })
    );
};
export const fetchDecommissedAssets = () => (dispatch) => {
  return api
    .get("/items?search=decommission&value=true")
    .then((res) => res.data)
    .then((assets) =>
      dispatch({
        type: assetActionTypes.FETCHDECOMMISSION_ASSETS,
        payload: assets,
      })
    );
};
export const fetchAllAssets = () => (dispatch) => {
  return api
    .get("/assets")
    .then((res) => res.data)
    .then((assets) =>
      dispatch({
        type: assetActionTypes.FETCH_ASSETS,
        payload: assets,
      })
    );
};

export const createAsset = (postData) => (dispatch) => {
  return api({
    method: "post",
    url: "/assets",
    data: postData,
  }).then((post) => {
    if (post.status === 201) {
      dispatch(
        {
          type: assetActionTypes.ADD_ASSET,
          payload: post,
        },
        Swal.fire({
          title: "Asset added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/asset");
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
// export const createAsset = (postData) => (dispatch) => {
//   return api({
//     method: "post",
//     url: "/assets",
//     data: postData,
//     headers: {
//       "Content-Type": `multipart/form-data; boundary=${postData._boundary}`,
//     },
//   }).then((post) => {
//     if (post.status === 201) {
//       dispatch(
//         {
//           type: assetActionTypes.ADD_ASSET,
//           payload: post,
//         },
//         Swal.fire({
//           title: "Asset added successfully",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         }).then(function () {
//           window.location.reload();
//         })
//       );
//     } else {
//       Swal.fire({
//         icon: "error",
//         text: post.data,
//         title: "Failed",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   });
// };

export const editAsset = (id, updateData) => (dispatch) => {
  return api.patch(`/assets/${id}`, updateData).then((update) => {
    if (update.status === 200) {
      dispatch(
        {
          type: assetActionTypes.UPDATE_ASSET,
          payload: update,
        },
        Swal.fire({
          title: "Asset updated successfully",
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

export const deleteAsset = (id) => (dispatch) => {
  return api.delete(`/assets/${id}`).then((del) => {
    if (del.status === 204) {
      dispatch(
        {
          type: assetActionTypes.DELETE_ASSET,
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
        text: del.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const decommissionAsset = (id, postData) => (dispatch) => {
  return api.patch(`/assets/${id}`, postData).then((del) => {
    if (del.status === 200) {
      dispatch(
        {
          type: assetActionTypes.DECOMM_ASSET,
          payload: del,
        },
        Swal.fire({
          title: "Asset decomission successful",
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
