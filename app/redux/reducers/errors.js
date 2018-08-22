import * as Const from '../constants';

const initialState = {
  error: {}
};

export default (state = initialState, action) => {
    const { type, err } = action;
    switch (type) {
        
        case Const.SAVE_ERROR:
            
            return { ...state, error: err };
            
        
        
    
        default:
            return state;
    }
};