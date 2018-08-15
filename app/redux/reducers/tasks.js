import * as Const from '../constants';

const initialState = {
    backLogTasks: [],
    doneTasks: [],
    toDoTasks: []
};

export default (state = initialState, action) => {
    const { type, tasks } = action;
    console.log('tasks', tasks);
    switch (type) {
        
        case Const.SAVE_MY_BACKLOG_TASKS:
            
            return { ...state, backLogTasks: tasks };
            
        case Const.SAVE_MY_DONE_TASKS:
            
            return { ...state, doneTasks: tasks };
        
        case Const.SAVE_MY_TODO_TASKS:
            
            return { ...state, toDoTasks: tasks };    
    
        default:
            return state;
    }
};