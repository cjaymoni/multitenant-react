import api from "../../services/api";
import Swal from "sweetalert2";
import { subCountryActions } from "./types";

export const fetchSubCountries = () => (dispatch) => {
  return api
    .get("/sub-countries?search=status&value=true")
    .then((res) => res.data)
    .then((subcountries) =>
      dispatch({
        type: subCountryActions.FETCH_SUBCOUNTRY_SUCCESS,
        payload: subcountries,
      })
    );
};

export const createSubCountry = (postData) => (dispatch) => {
  return api.post("/sub-countries", postData).then((post) => {
    if (post.status === 200) {
      dispatch(
        {
          type: subCountryActions.ADD_SUBCOUNTRY_SUCCESS,
          payload: post,
        },
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sub-Country Added",
        })
        //     .then(function(){
        //     window.location.reload();
        // })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: post.data,
        confirmButtonText: "Exit",
      });
    }
  });
};
