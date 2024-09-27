import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../Utility";

export const intialState = {
  loading: false,
  error: null,
  data: [],
  filterData: [],
  message: null,
  page: null,
  eventDetail: null,
  eventDetailError: null,
  eventCountryList: [],
  eventStateList: [],
  addEditError: null,
  addEditSuccess: null,
  addEditLoading: false,
  redirectTo: null,
  userListLoading: false,
  userListData: [],
  userListError: null,
};

const eventListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    message: null,
    redirectTo: null,
  });
};

const eventListFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    data: [],
    message: null,
    redirectTo: null,
  });
};

const eventDetail = (state, action) => {
  return updateObject(state, {
    eventDetail: action.data,
    eventDetailError: action.error,
  });
};

const eventListing = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    data: action.page === 1 ? action.data : [...state.data, ...action.data],
    filterData:
      action.page === 1 ? action.data : [...state.data, ...action.data],
    message: action.message,
    page: action.page,
    eventDetail: null,
    eventDetailError: null,
  });
};

const countryList = (state, action) => {
  return updateObject(state, { eventCountryList: action.data });
};

const stateList = (state, action) => {
  return updateObject(state, { eventStateList: action.data });
};

const addEditSuccess = (state, action) => {
  return updateObject(state, {
    addEditSuccess: action.message,
    redirectTo: action.redirectTo,
    addEditLoading: false,
  });
};

const addEditFail = (state, action) => {
  return updateObject(state, {
    addEditError: action.error,
    addEditLoading: false,
  });
};

const addEditStart = (state, action) => {
  return updateObject(state, {
    addEditError: null,
    addEditSuccess: null,
    addEditLoading: true,
  });
};

const userListStart = (state, action) => {
  return updateObject(state, { userListLoading: true, userListError: null });
};

const userListFail = (state, action) => {
  return updateObject(state, {
    userListLoading: false,
    userListError: action.error,
    data: [],
  });
};

const userListing = (state, action) => {
  return updateObject(state, {
    userListLoading: false,
    userListError: null,
    userListData:
      action.page === 1 ? action.data : [...state.data, ...action.data],
  });
};

const filterList = (state, action) => {
  let filterText = action.text;
  let fundData = state.filterData;
  let filteredItems = fundData.filter((item) => {
    if (
      item.title &&
      item.title.toLowerCase().includes(filterText.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  return updateObject(state, { data: filteredItems });
};

export const eventReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.EVENT_LIST_START:
      return eventListStart(state, action);
    case actionTypes.EVENT_LIST_FAIL:
      return eventListFail(state, action);
    case actionTypes.EVENT_LIST_SUCCESS:
      return eventListing(state, action);
    case actionTypes.EVENT_DETAIL:
      return eventDetail(state, action);
    case actionTypes.EVENT_ADD_EDIT_SUCCESS:
      return addEditSuccess(state, action);
    case actionTypes.EVENT_ADD_EDIT_FAIL:
      return addEditFail(state, action);
    case actionTypes.EVENT_ADD_EDIT_START:
      return addEditStart(state, action);
    case actionTypes.EVENT_COUNTRY_LIST:
      return countryList(state, action);
    case actionTypes.EVENT_STATE_LIST:
      return stateList(state, action);
    case actionTypes.EVENT_USER_LIST_START:
      return userListStart(state, action);
    case actionTypes.EVENT_USER_LIST_FAIL:
      return userListFail(state, action);
    case actionTypes.EVENT_USER_LIST_SUCCESS:
      return userListing(state, action);
    case actionTypes.EVENT_LIST_FILTER:
      return filterList(state, action);
    default:
      return state;
  }
};
