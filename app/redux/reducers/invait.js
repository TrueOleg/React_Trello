import * as Const from '../constants';

const initialState = {
  secret: '',
  board: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        
        case Const.SAVE_SECRET:
            
            return { ...state, secret: data };
            
        case Const.SAVE_INVAIT_BOARD:
            
            return { ...state, board: data };
        
    
        default:
            return state;
    }
};