import { ADD_COUNTRY, FETCH_COUNTRIES } from "./types";
import api from "../../services/api"
import Swal from 'sweetalert2';


export const fetchCountries = () =>dispatch =>{
    return api.get ('/countries?search=status&value=true')
    .then(res => res.data)
   .then(countries =>
        dispatch({
            type: FETCH_COUNTRIES,
            payload: countries
        }));

}

export const createCountry = postData => dispatch => {
    return api.post('/countries',postData)
    .then(post =>
        {if (post.status === 200){
        dispatch({
            type: ADD_COUNTRY,
            payload: post
        },
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Country Added',
            })
        //     .then(function(){ 
        //     window.location.reload();
        // })
        
        )
    }
    else {
        Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: post.data,
                confirmButtonText: 'Exit'
              })
            }
        }
    
        )
    }
    