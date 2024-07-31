import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    replayDetail : null,
    replayDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
}

const replayListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null,redirectTo:null })
}

const replayListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null,redirectTo:null })
}

const replayDetail = (state, action) => {
    return updateObject(state,{ replayDetail:action.data , replayDetailError : action.error })
}

const replayListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                filterData: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                                replayDetail : null,
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
        case actionTypes.REPLAY_LIST_START: return replayListStart(state,action) 
        case actionTypes.REPLAY_LIST_FAIL: return replayListFail(state,action) 
        case actionTypes.REPLAY_LIST_SUCCESS: return replayListing(state,action) 
        case actionTypes.REPLAY_DETAIL: return replayDetail(state,action) 
        case actionTypes.REPLAY_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.REPLAY_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.REPLAY_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.REPLAY_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer
