import * as Api from '../../servises/Api';
import * as Const from '../constants';


export const loginHasErrored = (data) => {
    return {
        type: Const.LOGIN_HAS_ERRORED,
        hasErrored: data
    };
};

export const isLogin = (data) => {
    return {
        type: Const.IS_LOGIN,
        data: data
    };
};  

export const saveError = (err) => {
    return {
        type: Const.SAVE_ERROR,
        err: err
    };
};  

export const logInUser = (data) => {
    return (dispatch) => {
        
        Api.post(`${Const.URL}/singin`, data)
            .then(res => {
               
                dispatch(isLogin(res.data));
            })
            .catch((err) => dispatch(saveError(err)));
    };
};

export const registrationUser = (data) => {
    return (dispatch) => {

        Api.post(`${Const.URL}/singup`, data)
            .then(res => {
                console.log('res', res);
                dispatch(isLogin(res.data));
            })
            .catch((err) => console.log(err));
    };
};
