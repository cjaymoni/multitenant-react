import api from "../../services/api";
import { currencyActions } from "./types";

export const fetchCurrencies = () => (dispatch) => {
  return api
    .get("/currencies")
    .then((res) => res.data)
    .then((currencies) =>
      dispatch({
        type: currencyActions.FETCH_CURRENCY_SUCCESS,
        payload: currencies,
      })
    );
};
