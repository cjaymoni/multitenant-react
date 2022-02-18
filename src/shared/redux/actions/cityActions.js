import api from "../../services/api";
import Swal from "sweetalert2";
import { cityActions } from "./types";

export const fetchCities = () => (dispatch) => {
  return api
    .get("/cities?search=status&value=true")
    .then((res) => res.data)
    .then((cities) =>
      dispatch({
        type: cityActions.FETCH_CITY_SUCCESS,
        payload: cities,
      })
    );
};

export const createCity = (postData) => (dispatch) => {
  return api.post("/cities", postData).then((post) => {
    if (post.status === 200) {
      dispatch(
        {
          type: cityActions.ADD_CITY_SUCCESS,
          payload: post,
        },
        Swal.fire({
          icon: "success",
          title: "Failed",
          timer: 2000,
          showConfirmButton: false,
        })
        //     .then(function(){
        //     window.location.reload();
        // })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: post.data,
        showConfirmButton: false,
      });
    }
  });
};
