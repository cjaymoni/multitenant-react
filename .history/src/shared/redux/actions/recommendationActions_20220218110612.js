import {ADD_RECOMMENDATIONS, DELETE_RECOMMENDATIONS, FETCH_DEPARTMENTRECOMMENDATIONS, FETCH_PRIORITIES, FETCH_RECOMMENDATIONS, FETCH_USERRECOMMENDATIONS, UPDATE_RECOMMENDATIONS } from "./types";
import api from "../../services/api"
import Swal from 'sweetalert2'

export const fetchRecommendations = () =>dispatch =>{
    return api.get ('/proposals')
    .then(res => res.data)
   .then(recommendations =>
        dispatch({
            type: FETCH_RECOMMENDATIONS,
            payload: recommendations
        }));

}
export const fetchPriorities = () =>dispatch =>{
  return api.get ('/priorities')
  .then(res => res.data)
 .then( priorities =>
      dispatch({
          type: FETCH_PRIORITIES,
          payload: priorities
      }));

}
export const fetchUserRecommendations = () =>dispatch=> {
  return api.get(`/proposals/?search=author_id&value=${localStorage.user_id}`)
  .then(res => res.data)
 .then(userproposal =>
      dispatch({
          type: FETCH_USERRECOMMENDATIONS,
          payload: userproposal
      }));

}
export const fetchDepartmentRecommendations = () =>dispatch=> {
  return api.get(`proposals/?search=department_id&value=${localStorage.department_id}`)
  .then(res => res.data)
 .then(departmentproposal =>
      dispatch({
          type: FETCH_DEPARTMENTRECOMMENDATIONS,
          payload: departmentproposal
      }));

}

export const createRecommendation = (postData) => (dispatch) => {
    return api
      .post("/proposals", postData)
      .then((post) => {
        if (post.status === 201) {
          dispatch(
            {
              type: ADD_RECOMMENDATIONS,
              payload: post,
            },
            Swal.fire({
              title: "Recommendation added successfully.",
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
  
  export const editRecommendation = (id,updateData) => (dispatch) => {
    return api
      .patch(`/proposals/${id}`, updateData)
      .then((update) => {
        if (update.status === 200) {
          dispatch(
            {
              type: UPDATE_RECOMMENDATIONS,
              payload: update,
            },
            Swal.fire({
              title: "Recommendation updated successfully",
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
  
  export const deleteRecommendation = (id,deleteData) => (dispatch) => {
    return api
      .delete(`/proposals/${id}`, deleteData)
      .then((remove) => {
        if (remove.status === 200) {
          dispatch(
            {
              type: DELETE_RECOMMENDATIONS,
              payload: remove,
            },
            Swal.fire({
              title: "Recommendation has been removed",
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
  