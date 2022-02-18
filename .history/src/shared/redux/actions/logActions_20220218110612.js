import {FETCH_LOGS} from './types';
import api from "../../services/api"


export const fetchLogs = (type) =>dispatch =>{
    return api.get (`/logs/${type}`)
    .then(res => res.data)
   .then(logs =>
        dispatch({
            type: FETCH_LOGS,
            payload: logs
        }));

}
