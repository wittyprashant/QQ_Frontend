import * as actions from "./actionTypes";
import axios from '../../axios_call'
import Moment from 'moment';

const fundlListStart = () => {
    return {
        type : actions.FUND_LIST_START
    }
}

const fundlListFail = (error) => {
    return {
        type : actions.FUND_LIST_FAIL,
        error : error
    }   
}

const fundListSuccess = (message,data,page) => {
    return {
        type : actions.FUND_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const fundDeleteAction = (id) => {
    return {
        type : actions.FUND_DELETE,
        id : id,
    }
}

const fundAddEditStart = () => {
    return {
        type : actions.FUND_ADD_EDIT_START
    }
}

const fundAddEditFail = (error) => {
    return {
        type : actions.FUND_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const fundAddEditSuccess = (message,data) => {
    return {
        type : actions.FUND_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/funding"
    }
}

const fundDetail = (data,error,redirectTo) => {
    return {
        type : actions.FUND_DETAIL,
        data : data,
        error : error,
        redirectTo: redirectTo
    }
}

export const fundList = (param) => {
    return dispatch => {        
        dispatch(fundlListStart());
        axios.get('SuperAdmin/geallfundingdetails?ordering='+param.order)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(fundListSuccess(msg,data,param.page));
            }else{
                dispatch(fundlListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(fundlListFail(error.message))
        })
    }
}



export const fundDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletefunding?fundingid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(fundDeleteAction(id));
            }           
        })
    }
}

export const getfundDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/geallfundingdetailsById?id='+id)
        .then((response) => {
            if(response.data.result){
                try{
                    let dt=Moment(response.data.result.dueDate)._d
                    if(dt === "Invalid Date"){
                        response.data.result.dueDate=new Date();
                        // console.log("Try",response.data.result)
                    }
                }catch(e){
                    response.data.result.dueDate=new Date();
                    // console.log("Catch",response.data.result.dueDate)
                }
                dispatch(fundDetail(response.data.result,"",null));
            }else{
                dispatch(fundDetail(null,"Invalide FUND Detail","/funding"));
            }         
        })
    }
}

const fundCategoryList = (data,error) => {
    return {
        type : actions.FUND_CATEGORY_LIST,
        data : data,
        error : error,
    }
}


const fundfilterList = (text) => {
    return {
        type : actions.FUND_LIST_FILTER,
        text : text,
    }
}


export const fundAddEdit = (param) => {
    return dispatch => {        
        dispatch(fundAddEditStart());
        axios.post('SuperAdmin/addupdatefunding',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(fundAddEditSuccess(msg,data));
            }else{
                dispatch(fundAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(fundAddEditFail(error.message))
        })
    }
}

export const getCategoryList = () => {
    return dispatch => {        
        axios.get('FundingResources/gefundingcategory')
        .then((response) => {
            if(response.data.result){
                dispatch(fundCategoryList(response.data.result,""));
            }else{
                dispatch(fundCategoryList(null,"No Category"));
            }         
        })
    }
}

export const fundListFilter = (filterText) => {
    return dispatch => {        
        dispatch(fundfilterList(filterText));
    }
}