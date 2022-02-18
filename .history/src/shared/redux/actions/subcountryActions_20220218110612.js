import {FETCH_SUBCOUNTRIES,  ADD_SUBCOUNTRY} from './types'
import api from "../../services/api"
import Swal from 'sweetalert2';


export const fetchSubCountries = () =>dispatch =>{
    return api.get ('/sub-countries?search=status&value=true')
    .then(res => res.data)
   .then(subcountries =>
        dispatch({
            type: FETCH_SUBCOUNTRIES,
            payload: subcountries
        }));

}

export const createSubCountry = postData => dispatch => {
    return api.post('/sub-countries',postData)
    .then(post =>
        {if (post.status === 200){
        dispatch({
            type: ADD_SUBCOUNTRY,
            payload: post
        },
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Sub-Country Added',
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
    