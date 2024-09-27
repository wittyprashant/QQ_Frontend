import * as actions from "./actionTypes";
import axios from "../../axios_call";

const userlListStart = () => {
  return {
    type: actions.EVENT_USER_LIST_START,
  };
};

const userListFail = (error) => {
  return {
    type: actions.EVENT_USER_LIST_FAIL,
    error: error,
  };
};

const userListSuccess = (message, data, page) => {
  return {
    type: actions.EVENT_USER_LIST_SUCCESS,
    message: message,
    data: data,
    page: page,
  };
};

const eventlListStart = () => {
  return {
    type: actions.EVENT_LIST_START,
  };
};

const eventListFail = (error) => {
  return {
    type: actions.EVENT_LIST_FAIL,
    error: error,
  };
};

const eventListSuccess = (message, data, page) => {
  return {
    type: actions.EVENT_LIST_SUCCESS,
    message: message,
    data: data,
    page: page,
  };
};

const eventDeleteAction = (id) => {
  return {
    type: actions.EVENT_DELETE,
    id: id,
  };
};

const eventlAddEditStart = () => {
  return {
    type: actions.EVENT_ADD_EDIT_START,
  };
};

const eventAddEditFail = (error) => {
  return {
    type: actions.EVENT_ADD_EDIT_FAIL,
    error: error,
    redirectTo: null,
  };
};

const eventAddEditSuccess = (message, data) => {
  return {
    type: actions.EVENT_ADD_EDIT_SUCCESS,
    message: message,
    data: data,
    redirectTo: "/events",
  };
};

const eventfilterList = (text) => {
  return {
    type: actions.EVENT_LIST_FILTER,
    text: text,
  };
};

export const eventDetail = (data, error) => {
  return {
    type: actions.EVENT_DETAIL,
    data: data,
    error: error,
  };
};

export const eventStateList = (data, error) => {
  return {
    type: actions.EVENT_STATE_LIST,
    data: data,
    error: error,
  };
};

export const eventCountryList = (data, error) => {
  return {
    type: actions.EVENT_COUNTRY_LIST,
    data: data,
    error: error,
  };
};

export const eventList = (param) => {
  return (dispatch) => {
    dispatch(eventlListStart());
    axios
      .get("SuperAdmin/getevent?order=" + param.order + "&page=" + param.page)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result;
          const msg = response.data.message;
          dispatch(eventListSuccess(msg, data, param.page));
        } else {
          dispatch(eventListFail(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(eventListFail(error.message));
      });
  };
};

export const eventDelete = (id) => {
  return (dispatch) => {
    axios.delete("SuperAdmin/deleteevent?eventid=" + id).then((response) => {
      if (response.data.status) {
        dispatch(eventDeleteAction(id));
      }
    });
  };
};

export const getEventDetail = (id) => {
  return (dispatch) => {
    axios.get("SuperAdmin/geteventbyid?eventid=" + id).then((response) => {
      if (response.data.result) {
        dispatch(eventDetail(response.data.result, ""));
      } else {
        dispatch(eventDetail(null, "Invalide Event Detail"));
      }
    });
  };
};

export const eventAddEdit = (param) => {
  return (dispatch) => {
    dispatch(eventlAddEditStart());
    axios
      .post("SuperAdmin/addupdateevent", param)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result;
          const msg = response.data.message;
          dispatch(eventAddEditSuccess(msg, data));
        } else {
          dispatch(eventAddEditFail(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(eventAddEditFail(error.message));
      });
  };
};

export const getCountryList = () => {
  return (dispatch) => {
    axios.get("CountryState/getallcountry").then((response) => {
      if (response.data.result) {
        dispatch(eventCountryList(response.data.result, ""));
      } else {
        dispatch(eventCountryList(null, "No Country"));
      }
    });
  };
};

export const getStateList = (id) => {
  return (dispatch) => {
    axios
      .get("CountryState/getstatebycountry?countryid=" + id)
      .then((response) => {
        if (response.data.result) {
          dispatch(eventStateList(response.data.result, ""));
        } else {
          dispatch(eventStateList(null, "No State"));
        }
      });
  };
};

export const eventUserList = (id) => {
  return (dispatch) => {
    dispatch(userlListStart());
    axios
      .get("SuperAdmin/geteventregisteredmembers?eventid=" + id)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result;
          const msg = response.data.message;
          dispatch(userListSuccess(msg, data, 1));
        } else {
          dispatch(userListFail(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(userListFail(error.message));
      });
  };
};

export const eventListFilter = (filterText) => {
  return (dispatch) => {
    dispatch(eventfilterList(filterText));
  };
};
