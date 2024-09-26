import * as actions from "./actionTypes";
import axios from '../../axios_call'



const transactionListStart = () => {
    return {
        type : actions.TRANSACTION_LIST_START
    }
}

const transactionListFail = (error) => {
    return {
        type : actions.TRANSACTION_LIST_FAIL,
        error : error
    }   
}

const transactionListSuccess = (message,data,page) => {
    return {
        type : actions.TRANSACTION_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const transactionDeleteAction = (id) => {
    return {
        type : actions.TRANSACTION_DELETE,
        id : id,
    }
}

const transactionAddEditStart = () => {
    return {
        type : actions.TRANSACTION_ADD_EDIT_START
    }
}

const transactionAddEditFail = (error) => {
    return {
        type : actions.TRANSACTION_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const transactionAddEditSuccess = (message,data) => {
    return {
        type : actions.TRANSACTION_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/transactions"
    }
}

const transactionDetail = (data,error) => {
    return {
        type : actions.TRANSACTION_DETAIL,
        data : data,
        error : error,
    }
}

const transactionfilterList = (text) => {
    return {
        type : actions.TRANSACTION_LIST_FILTER,
        text : text
    }
}
const constructUrlWithParams = (baseUrl, params) => {
    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${query}`;
  };
  
  export const transactionList = (params) => {
    return (dispatch) => {
      dispatch(transactionListStart());
  
      const baseUrl = 'http://localhost:8080/api/v1/transaction';
      const url = constructUrlWithParams(baseUrl, params);
  
      axios.get(url)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            const msg = response.data.message;
            dispatch(transactionListSuccess(msg, data, params.page));
          } else {
            dispatch(transactionListFail(response.message));
          }
        })
        .catch((error) => {
          dispatch(transactionListFail(error.message));
        });
  
      // Mock success for local testing (remove this in production)
      dispatch(transactionListSuccess('Data Successfully.', [{}, {}, {}], 1));
    };
  };


export const transactionDelete = (id,token) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletetransaction?transactionid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(transactionDeleteAction(id));
            }           
        })
    }
}

export const gettransactionDetail = (id) => {
    return dispatch => {
      return axios.get(`http://localhost:8080/api/v1/transaction/transaction-detail/${id}`)
        .then(response => {
          if (response.status === 200 && response.data) {
            console.log("Transaction ID:", id);
            dispatch(transactionDetail(response.data, "")); // Dispatch the data
            return response; // Return the response for async handling
          } else {
            dispatch(transactionDetail(null, "Invalid transaction detail"));
            return { data: null }; // Return something even in error cases
          }
        })
        .catch(error => {
          dispatch(transactionDetail(null, error.message));
          return { data: null }; // Return something even on error
        });
    };
  };
//   export const getBankAccountDeatils = () => {
//     return dispatch => {
//       return axios.get(`http://localhost:8080/api/v1/transaction/bankDetails`)
//         .then(response => {
//           if (response.status === 200 && response.data) {
//             console.log("Transaction IDreposnse:",response.data);
//             dispatch(transactionDetail(response.data, "")); // Dispatch the data
//             return response; // Return the response for async handling
//           } else {
//             dispatch(transactionDetail(null, "Invalid transaction detail"));
//             return { data: null }; // Return something even in error cases
//           }
//         })
//         .catch(error => {
//           dispatch(transactionDetail(null, error.message));
//           return { data: null }; // Return something even on error
//         });
//     };
//   };

export const TransactionDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/gettransactionbyid?id='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(transactionDetail(response.data.result,""));
            }else{
                dispatch(transactionDetail(null,"Invalide transaction Detail"));
            }         
        })
    }
}

export const transactionAddEdit = (param) => {
    return dispatch => {        
        dispatch(transactionAddEditStart());
        axios.post('SuperAdmin/addupdatetransaction',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(transactionAddEditSuccess(msg,data));
            }else{
                dispatch(transactionAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(transactionAddEditFail(error.message))
        })
    }
}


export const addEditTransactionErrorNull = () => {
    return dispatch => {
        dispatch(transactionAddEditFail(null))
    }   
}

export const transactionListFilter = (filterText) => {
    return dispatch => {        
        dispatch(transactionfilterList(filterText));
    }
}