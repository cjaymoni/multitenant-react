import { FETCH_CURRENCIES,} from "./types";
import api from "../../services/api"

export const fetchCurrencies = () =>dispatch =>{
    return api.get ('/currencies?search=status&value=true')
    .then(res => res.data)
   .then(currencies =>
        dispatch({
            type: FETCH_CURRENCIES,
            payload: currencies
        }));

}