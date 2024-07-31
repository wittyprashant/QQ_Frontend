import * as actions from "./actionTypes";
import axios from '../../axios_call'


const replayListStart = () => {
    return {
        type : actions.REPLAY_LIST_START
    }
}

const replayListFail = (error) => {
    return {
        type : actions.REPLAY_LIST_FAIL,
        error : error
    }   
}

const replayListSuccess = (message,data,page) => {
    return {
        type : actions.REPLAY_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const replayDeleteAction = (id) => {
    return {
        type : actions.REPLAY_DELETE,
        id : id,
    }
}

const replayAddEditStart = () => {
    return {
        type : actions.REPLAY_ADD_EDIT_START
    }
}

const replayAddEditFail = (error) => {
    return {
        type : actions.REPLAY_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const replayAddEditSuccess = (message,data) => {
    return {
        type : actions.REPLAY_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/replays"
    }
}

const replayDetail = (data,error) => {
    return {
        type : actions.REPLAY_DETAIL,
        data : data,
        error : error,
    }
}

const replayfilterList = (text) => {
    return {
        type : actions.REPLAY_LIST_FILTER,
        text : text
    }
}

export const replayList = (param,token) => {
    return dispatch => {        
        dispatch(replayListStart());
        axios.get('SuperAdmin/getreplayslist')
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(replayListSuccess(msg,data,param.page));
            }else{
                dispatch(replayListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(replayListFail(error.message))
        })
    }
}

export const replayDelete = (id,token) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletereplaysbyid?replaysId='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(replayDeleteAction(id));
            }           
        })
    }
}

export const getreplayDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/getreplaysbyid?replaysId='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(replayDetail(response.data.result,""));
            }else{
                dispatch(replayDetail(null,"Invalide replay Detail"));
            }         
        })
    }
}

export const replayAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(replayAddEditStart());
        axios.post('SuperAdmin/addupdatereplays',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(replayAddEditSuccess(msg,data));
            }else{
                dispatch(replayAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(replayAddEditFail(error.message))
        })
    }
}

export const replayListFilter = (filterText) => {
    return dispatch => {        
        dispatch(replayfilterList(filterText));
    }
}