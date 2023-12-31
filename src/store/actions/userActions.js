import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
})

export const adminLoginSuccess = (userInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL,
})
export const userDetailDoctorSuccess = () => ({
    type: actionTypes.USER_DETAIL_DOCTOR_SUCCESS,
})
