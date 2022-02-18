import api from "../../services/api";
import { FETCH_DASH_DATA } from "./types";



export const fetchDashData = () =>dispatch =>{
    return api.get ('/dashboard')
    .then(res => res.data)
   .then(dashbord =>
        dispatch({
            type: FETCH_DASH_DATA,
            payload: dashbord
        }));

}
