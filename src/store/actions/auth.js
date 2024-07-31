import * as actions from './actionTypes';
import axios from '../../axios_call';
import Moment from 'moment';
import { endPoint } from '../../components/frontend_api/API/constant_api';

export const authStart = () => ({
    type: actions.AUTH_START,
});

export const authFail = (error) => {
    console.error('Auth Fail:', error); // Debug information
    return {
        type: actions.AUTH_FAIL,
        error: error,
    };
};

export const authSuccess = (data) => {
    ; // Debug information
    // console.log("d",data);
    return {
        type: actions.AUTH_SUCCESS,
        data: data
        // Include user ID in the action
    };
};

export const authLogout = () => {
    localStorage.clear();
    return {
        type: actions.AUTH_LOGOUT,
    };
};

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
        // axios.post('Authentication/login', {username : email,password : password})
        axios.post(endPoint.login, {email : email,password : password})
        .then((response) => {
            // console.log("--",response.status)
            if(response.status == 200){
                // console.log(JSON.stringify(response.data.data));
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
