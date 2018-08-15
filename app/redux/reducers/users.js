import * as Const from '../constants';

const initialState = {};

export default (state = initialState, action) => {
    const type = action.type;
    const users = action.users;
    const data = action.data;
    
    switch (type) {
        
        case Const.SAVE_USERS:
            
            return { ...state, data, users };

        case Const.CLEAR_USERS:
            
            return {};
                
        default:
            return state;
    }
};