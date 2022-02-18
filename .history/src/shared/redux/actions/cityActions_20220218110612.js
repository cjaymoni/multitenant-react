import {FETCH_CITIES, ADD_CITY} from './types';

import api from "../../services/api"
import Swal from 'sweetalert2';


export const fetchCities = () =>dispatch =>{
    return api.get ('/cities?search=status&value=true')
    .then(res => res.data)
   .then(cities =>
        dispatch({
            type: FETCH_CITIES,
            payload: cities
        }));

}

export const createCity = postData => dispatch => {
    return api.post('/cities',postData)
    .then(post =>
        {if (post.status === 200){
        dispatch({
            type: ADD_CITY,
            payload: post
        },
        Swal.fire({
            icon: 'success',
            title: "Failed",
            timer: 2000,
            showConfirmButton: false
            })
        //     .then(function(){ 
        //     window.location.reload();
        // })
        
        )
    }
    else {
        Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: post.data,
                showConfirmButton: false
            })
            }
        }
    
        )
    }
    