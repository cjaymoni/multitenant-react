import {
  FETCH_LOCATION,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  FETCH_DEPARTMENTLOCATION
} from "./types";
import api from "../../services/api"
import Swal from "sweetalert2";
export const fetchLocation = () => (dispatch) => {
  return api
    .get("/locations?search=status&value=true")
    .then((res) => res.data)
    .then((location) =>
      dispatch({
        type: FETCH_LOCATION,
        payload: location,
      })
    );
};

export const fetchLocationDepartments =(id)=>(dispatch)=>{
  return api.get(`/locations/${id}/departments?search=status&value=true`,

  )
  .then((res) => res.data)
  .then((departmentlocation) =>
    dispatch({
      type: FETCH_DEPARTMENTLOCATION,
      payload: departmentlocation,
    })
  );
}
export const fetchLocDepartments =()=>(dispatch)=>{
  return api.get(`/locations/${localStorage.loc_id}/departments?search=status&value=true`,

  )
  .then((res) => res.data)
  .then((departmentlocation) =>
    dispatch({
      type: FETCH_DEPARTMENTLOCATION,
      payload: departmentlocation,
    })
  );
}
export const createLocation = (postData) => (dispatch) => {
  return api
    .post("/locations", postData)
    .then((post) => {
      if (post.status === 201) {
        dispatch(
          {
            type: ADD_LOCATION,
            payload: post,
          },
          Swal.fire({
            title: "Location added successfully",
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

export const updateLocation = (id,updateData) => (dispatch) => {
  return api
    .patch(`/locations/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: UPDATE_LOCATION,
            payload: update,
          },
          Swal.fire({
            icon: "success",
            title: "Location updated successfully",
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


export const disableLocation = (id,updateData) => (dispatch) => {
  return api
    .patch(`/locations/${id}`, updateData)
    .then((update) => {
      if (update.status === 200) {
        dispatch(
          {
            type: UPDATE_LOCATION,
            payload: update,
          },
          Swal.fire({
            icon: "success",
            title: "Location has been removed",
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

export const deleteLocation = (id) => (dispatch) => {
  return api
    .delete(`/locations/${id}`)
    .then((remove) => {
      if (remove.status === 200) {
        dispatch(
          {
            type: DELETE_LOCATION,
            payload: remove,
          },
          Swal.fire({
            title: "Location has been permanently removed",
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