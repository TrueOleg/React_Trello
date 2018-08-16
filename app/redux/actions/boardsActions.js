import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyBoards = (boards) => {
  return {
      type: Const.SAVE_MY_BOARDS,
      boards
  };
}; 

export const saveInvaitBoard = (data) => {
    return {
        type: Const.SAVE_INVAIT_BOARD,
        data: data
    };
  }; 

export const saveSecret = (data) => {
    return {
        type: Const.SAVE_SECRET,
        data: data
    };
  };  
  

export const getBoards = () => {
    return (dispatch) => {
 
        Api.get(`${Const.URL}/boards/my`)
            .then(res => {
              dispatch(saveMyBoards(res.data.boards));
                
            })
            .catch((err) => console.log(err));
    };
};

export const getBoardId = (hash) => {
    return (dispatch) => {
        
        const punctuationless = hash.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const finalString = punctuationless.replace(/\s{2,}/g," ");
        
        Api.get(`${Const.URL}/boards/search?id=${finalString}`)
            .then(res => {
              dispatch(saveInvaitBoard(res.data.board));
                
            })
            .catch((err) => console.log(err));
    };
};

export const writeBoard = (data) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/boards/`, data)
            .then(res => {
              dispatch(saveMyBoards(res.data.boards));
                
            })
            .catch((err) => console.log(err));
    };
};

export const createHashSecret = (boardId) => {
    return (dispatch) => {
 
        Api.put(`${Const.URL}/boards/`, {boardId})
            .then(res => {
                dispatch(saveSecret(res.data.secretHash));

            })
            .catch((err) => console.log(err));
                        
    };
};

export const deleteBoard = (boardId) => {
    return (dispatch) => {
 
        Api.del(`${Const.URL}/boards?board_id=${boardId}`)
            .then(res => {
                dispatch(saveMyBoards(res.data.boards));
            })
            .catch((err) => console.log(err));
                      
    };
};