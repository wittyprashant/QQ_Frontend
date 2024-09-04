import * as actions from './actionTypes';
import axios from '../../axios_call';
import Moment from 'moment';
import { endPoint } from '../../components/frontend_api/API/constant_api';

export const authStart = () => ({
    type: actions.AUTH_START,
});

export const authFail = (error) => {
    console.error('Auth Fail:', error);
    return {
        type: actions.AUTH_FAIL,
        error: error,
    };
};

export const authSuccess = (data) => {
    return {
        type: actions.AUTH_SUCCESS,
        data: data
    };
};

export const authLogout = () => {
    localStorage.clear();
    return {
        type: actions.AUTH_LOGOUT,
    };
};
export const setUserId = (userId) => ({
    type: 'SET_USER_ID',
    payload: userId,
});

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn);
    };
};

export const userLogin = (email,password) => {
    return dispatch => {        
        dispatch(authStart());
        axios.post(endPoint.login, {email : email,password : password})
        .then((response) => {
            if(response.status === 200){
                localStorage.setItem("userDetail", JSON.stringify(response.data.data))
                dispatch(authSuccess(response.data.data));
            } else {
                dispatch(authLogout())
                dispatch(authFail(response.message))
            }         
        })
        .catch((error) => {
            dispatch(authFail(error.message))
        })
    }
}

export const userRegister = (role_id, first_name, last_name, email, password, confirm_password, status, is_deleted) => {
    return dispatch => {
        dispatch(authStart());
        return axios.post(endPoint.register, {role_id, first_name, last_name, email, password, confirm_password, status, is_deleted})
        .then((response) => {
            if (response.status === 200 && response.data.success) {
                localStorage.setItem("userDetail", JSON.stringify(response.data.data));
                dispatch(authSuccess(response.data.message));
                return response;
            } else {
                dispatch(authFail(response.data.message));
                return response;
            }
        })
        .catch((error) => {
            dispatch(authFail(error.message));
            throw error;
        });
    }
}
export const userForgot = ( email ) => {
    return dispatch => {
        dispatch(authStart());
        return axios.post(endPoint.ForgotPass, {email})
        .then((response) => {
            if (response.status === 200 && response.data.success) {
                localStorage.setItem("userDetail", JSON.stringify(response.data.data));
                dispatch(authSuccess(response.data.message));
                return response;
            } else {
                dispatch(authFail(response.data.message));
                return response;
            }
        })
        .catch((error) => {
            dispatch(authFail(error.message));
            throw error;
        });
    }
}
export const userOTP = ( email ) => {
    return dispatch => {
        dispatch(authStart());
        return axios.post(endPoint.ForgotPass, {email})
        .then((response) => {
            if (response.status === 200 && response.data.success) {
                localStorage.setItem("userDetail", JSON.stringify(response.data.data));
                dispatch(authSuccess(response.data.message));
                return response;
            } else {
                dispatch(authFail(response.data.message));
                return response;
            }
        })
        .catch((error) => {
            dispatch(authFail(error.message));
            throw error;
        });
    }
}
export const userChangePassword = (id, password, confirm_password) => {
    return (dispatch) => {
        dispatch(authStart());

        return axios.post('http://localhost:8080/api/v1/user/change_password/${id}', {
            password: password,
            confirm_password: confirm_password
        })
        .then((response) => {
            if (response.status === 200 && response.data.success) {
                localStorage.setItem("userDetail", JSON.stringify(response.data.data));
                dispatch(authSuccess(response.data.message));
                return response;
            } else {
                dispatch(authFail(response.data.message));
                return response;
            }
        })
        .catch((error) => {
            dispatch(authFail(error.message));
            throw error;
        });
    };
};
export const authCheckState = () => {
    return dispatch => {
        try {
            const userDetail = JSON.parse(localStorage.getItem('userDetail'));
            if (!userDetail) {
                dispatch(authLogout());
                return;
            }
           // Retrieve userId from storage
           const now = Moment(new Date());
           const end = Moment(userDetail.tokenExpiration);
           if (end.isBefore(now)) {
               dispatch(authLogout());
           } else {
                const now = Moment(new Date());
                const end = Moment(userDetail.tokenExpiration);
                if (end.isBefore(now)) {
                    dispatch(authLogout());
                } else {
                    const duration = Moment.duration(end.diff(now));
                    const remainingSeconds = duration.asSeconds();
                  
                    dispatch(checkAuthTimeout(remainingSeconds * 1000));
                }
            }
        } catch (error) {
            console.error('Error parsing user details from localStorage:', error);
            dispatch(authLogout());
        }
    };
};