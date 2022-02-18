import {TRANSFER_ASSET,TRANSFER_INVENTORY} from "./types"
import Swal from 'sweetalert2';
import api from "../../services/api"

export const transferAsset =(updateData,id)=>dispatch=>{
    return api.patch(`/items/${id}`,updateData)
    .then(transfer =>
        {if (transfer.status === 200){
            dispatch({
                type:TRANSFER_ASSET,
                payload:transfer
            },
            Swal.fire({
                title: "Transfer successful",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
              }).then(function(){ 
                window.location.reload();
            })
            );
        }
        else {
            Swal.fire({
                    icon: 'error',
                    text: transfer.data,
                    title: "Failed",
                    timer: 2000,
                    showConfirmButton: false
                  })  
            }
        }
    
        )
    }
    

export const transferInventory =(updateData,id)=>dispatch=>{
    return api.patch(`/inventories/${id}`,updateData)
    .then(transfer =>
        {if (transfer.status === 200){
            dispatch({
                type:TRANSFER_INVENTORY,
                payload:transfer
            },
            Swal.fire({
                title: "Transfer successful",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
              }).then(function(){ 
                window.location.reload();
            })
            );
        }
        else {
            Swal.fire({
                    icon: 'error',
                    text: transfer.data,
                    title: "Failed",
                    timer: 2000,
                    showConfirmButton: false
                  })  
            }
        }
    
        )
    }
    