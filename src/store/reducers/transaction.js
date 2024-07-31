import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    transactionDetail : null,
    transactionDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
    transactionCategoryList:[],
}

const transactionListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null,redirectTo:null })
}

const transactionListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null,redirectTo:null })
}

const transactionDetail = (state, action) => {
    return updateObject(state,{ transactionDetail:action.data , transactionDetailError : action.error })
}

const transactionListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                filterData: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                                transactionDetailError:null,
                                transactionDetail:null,
                                redirectTo:null
                            })
}


const addEditSuccess = (state, action) => {
    return updateObject(state,{ addEditSuccess:action.message,redirectTo:action.redirectTo, addEditLoading:false })
}

const addEditFail = (state, action) => {
    return updateObject(state,{ addEditError:action.error, addEditLoading:false  })
}

const addEditStart = (state, action) => {
    return updateObject(state,{ addEditError:null,addEditSuccess:null, addEditLoading:true })
}


const filterList = (state, action) => {
    let filterText = action.text;
    let fundData = state.filterData;
    let filteredItems = fundData.filter(
        (item) => {
            if (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}


const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.TRANSACTION_LIST_START: return transactionListStart(state,action) 
        case actionTypes.TRANSACTION_LIST_FAIL: return transactionListFail(state,action) 
        case actionTypes.TRANSACTION_LIST_SUCCESS: return transactionListing(state,action) 
        case actionTypes.TRANSACTION_DETAIL: return transactionDetail(state,action) 
        case actionTypes.TRANSACTION_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.TRANSACTION_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.TRANSACTION_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.TRANSACTION_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer
