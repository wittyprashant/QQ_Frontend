import * as actions from "./actionTypes";
import axios from '../../axios_call'



const dashboardListStart = () => {
    return {
        type : actions.DASHBOARD_LIST_START
    }
}

const dashboardListFail = (error) => {
    return {
        type : actions.DASHBOARD_LIST_FAIL,
        error : error
    }   
}

const dashboardListSuccess = (message,data,page) => {
    return {
        type : actions.DASHBOARD_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

// const transactionDeleteAction = (id) => {
//     return {
//         type : actions.dash_DELETE,
//         id : id,
//     }
// }

// const transactionAddEditStart = () => {
//     return {
//         type : actions.TRANSACTION_ADD_EDIT_START
//     }
// }

// const transactionAddEditFail = (error) => {
//     return {
//         type : actions.TRANSACTION_ADD_EDIT_FAIL,
//         error : error,
//         redirectTo:null
//     }   
// }

// const transactionAddEditSuccess = (message,data) => {
//     return {
//         type : actions.TRANSACTION_ADD_EDIT_SUCCESS,
//         message : message,
//         data : data,
//         redirectTo:"/transactions"
//     }
// }

const dashboardDetail = (data,error) => {
    return {
        type : actions.DASHBOARD_DETAIL,
        data : data,
        error : error,
    }
}

// const transactionfilterList = (text) => {
//     return {
//         type : actions.Dash_LIST_FILTER,
//         text : text
//     }
// }
const constructUrlWithParams = (baseUrl, params) => {
    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${query}`;
  };
  
  export const dashboardList = (params) => {
    return (dispatch) => {
      dispatch(dashboardListStart());
  
      const baseUrl = 'http://localhost:8080/api/v1/invoice';
      const url = constructUrlWithParams(baseUrl, params);
  
      axios.get(url)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            const msg = response.data.message;
            dispatch(dashboardListSuccess(msg, data, params.page));
          } else {
            dispatch(dashboardListFail(response.message));
          }
        })
        .catch((error) => {
          dispatch(dashboardListFail(error.message));
        });
  
      // Mock success for local testing (remove this in production)
      dispatch(dashboardListSuccess('Data Successfully.', [{}, {}, {}], 1));
    };
  };


// export const transactionDelete = (id,token) => {
//     return dispatch => {        
//         axios.delete('SuperAdmin/deletetransaction?transactionid='+id)
//         .then((response) => {
//             if(response.data.status){
//                 dispatch(transactionDeleteAction(id));
//             }           
//         })
//     }
// }

export const getdashboardDetail = (id) => {
    return dispatch => {
      
        axios.get(`http://localhost:8080/api/v1/invoice/`+id)
        .then(response => {
            if (response.status === 200) {
                console.log("Transaction ID:", id);
                dispatch(dashboardDetail(response.data.data, ""));
            } else {
                dispatch(dashboardDetail(null, "Invalid transaction detail"));
            }
        })
        .catch(error => {
            dispatch(dashboardDetail(null, error.message));
        });
    };
};

// export const TransactionDetail = (id) => {
//     return dispatch => {        
//         axios.get('SuperAdmin/gettransactionbyid?id='+id)
//         .then((response) => {
//             if(response.data.result){
//                 dispatch(transactionDetail(response.data.result,""));
//             }else{
//                 dispatch(transactionDetail(null,"Invalide transaction Detail"));
//             }         
//         })
//     }
// }

// export const transactionAddEdit = (param) => {
//     return dispatch => {        
//         dispatch(transactionAddEditStart());
//         axios.post('SuperAdmin/addupdatetransaction',param)
//         .then((response) => {
//             if(response.data.status){
//                 const data = response.data.result
//                 const msg = response.data.message 
//                 dispatch(transactionAddEditSuccess(msg,data));
//             }else{
//                 dispatch(transactionAddEditFail(response.data.message))
//             }            
//         })
//         .catch((error) => {
//             dispatch(transactionAddEditFail(error.message))
//         })
//     }
// }


// export const addEditTransactionErrorNull = () => {
//     return dispatch => {
//         dispatch(transactionAddEditFail(null))
//     }   
// }

// export const transactionListFilter = (filterText) => {
//     return dispatch => {        
//         dispatch(transactionfilterList(filterText));
//     }
// }