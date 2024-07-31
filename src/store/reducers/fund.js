import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading: false,
    error: null,
    data: [],
    filterData: [],
    message: null,
    page: null,
    fundDetail: null,
    fundDetailError: null,
    addEditError: null,
    addEditSuccess: null,
    addEditLoading: false,
    redirectTo: null,
    fundCategoryList: [],
}

const fundListStart = (state, action) => {
    return updateObject(state, { loading: true, error: null, message: null, redirectTo: null })
}

const fundListFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error, data: [], message: null, redirectTo: null })
}

const fundDetail = (state, action) => {
    return updateObject(state, { fundDetail: action.data, fundDetailError: action.error, redirectTo: action.redirectTo })
}

const fundListing = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.page === 1 ? action.data : [...state.data, ...action.data],
        filterData: action.page === 1 ? action.data : [...state.data, ...action.data],
        message: action.message,
        page: action.page,
        fundDetailError: null,
        fundDetail: null,
        redirectTo: null
    })
}


const addEditSuccess = (state, action) => {
    return updateObject(state, { addEditSuccess: action.message, redirectTo: action.redirectTo, addEditLoading: false })
}

const addEditFail = (state, action) => {
    return updateObject(state, { addEditError: action.error, addEditLoading: false })
}

const addEditStart = (state, action) => {
    return updateObject(state, { addEditError: null, addEditSuccess: null, addEditLoading: true })
}

const categoryList = (state, action) => {
    return updateObject(state, { fundCategoryList: action.data })
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

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.FUND_LIST_START: return fundListStart(state, action)
        case actionTypes.FUND_LIST_FAIL: return fundListFail(state, action)
        case actionTypes.FUND_LIST_SUCCESS: return fundListing(state, action)
        case actionTypes.FUND_DETAIL: return fundDetail(state, action)
        case actionTypes.FUND_ADD_EDIT_SUCCESS: return addEditSuccess(state, action)
        case actionTypes.FUND_ADD_EDIT_FAIL: return addEditFail(state, action)
        case actionTypes.FUND_ADD_EDIT_START: return addEditStart(state, action)
        case actionTypes.FUND_CATEGORY_LIST: return categoryList(state, action)
        case actionTypes.FUND_LIST_FILTER: return filterList(state, action)
        default: return state
    }
}

export default reducer
