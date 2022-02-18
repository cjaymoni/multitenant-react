import {FETCH_REQUESTS, UPDATE_REQUEST, ISSUE_REQUEST, FETCH_USERREQUESTS, FETCH_DEPARTMENTREQUESTS } from "./types";
import api from "../../services/api"
import Swal from 'sweetalert2'

export const fetchRequests = () =>dispatch =>{
    return api.get ('/requests')
    .then(res => res.data)
   .then(requests =>
        dispatch({
            type: FETCH_REQUESTS,
            payload: requests
        }));

}

export const fetchUserRequests = () =>dispatch =>{
    return api.get (`users/${localStorage.user_id}/requests`)
    .then(res => res.data)
   .then(userrequests =>
        dispatch({
            type: FETCH_USERREQUESTS,
            payload: userrequests
        }));

}
export const fetchDepartmentRequests = () =>dispatch =>{
    return api.get (`departments/${localStorage.department_id}/requests`)
    .then(res => res.data)
   .then(departmentrequest =>
        dispatch({
            type: FETCH_DEPARTMENTREQUESTS,
            payload: departmentrequest
        }));

}

export const issueRequest = issueData => dispatch => {
    return api.post('/requests',issueData)
    .then(issue =>
    {if (issue.status=== 201){
        dispatch({
            type:ISSUE_REQUEST,
            payload:issue
        },
        Swal.fire({
            title: "Request sent successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          }).then(function(){ 
            window.location.reload();
        }))
    }
    else {
        Swal.fire({
                icon: 'error',
                text: issue.data,
                title: "Failed",
                timer: 2000,
                showConfirmButton: false     
              })  
        }
    }

    )
}

export const issueHeadRequest = issueData => dispatch => {
    return api.post('/requests',issueData)
    .then(issue =>
    {if (issue.status=== 201){
        dispatch({
            type:ISSUE_REQUEST,
            payload:issue
        },
        localStorage.setItem('request_id', issue.data.id)
    //  console.log(issue.data)
        
        )
    }
    else {
        Swal.fire({
                icon: 'error',
                text: issue.data,
                title: "Failed",
                timer: 2000,
                showConfirmButton: false     
              })  
        }
    }

    )
}

export const editRequest = (updateData,id) => dispatch => {
    return api.patch(`/requests/${id}`,updateData)
    .then(update =>
    {if (update.status === 200){
        dispatch({
            type:UPDATE_REQUEST,
            payload:update
        },
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Verification Successful',
            timer: 2000,
            showConfirmButton: false  
            }).then(function(){ 
            window.location.reload();
        }))
    }
    else {
        Swal.fire({
                icon: 'error',
                text: update.data,
                title: "Failed",
                timer: 2000,
                showConfirmButton: false     
              })  
        }
    }

    )
}
