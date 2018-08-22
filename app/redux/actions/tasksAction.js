import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyBackLogTasks = (tasks) => {
  return {
      type: Const.SAVE_MY_BACKLOG_TASKS,
      tasks: tasks
  };
};  

export const saveMyDoneTasks = (tasks) => {
    return {
        type: Const.SAVE_MY_DONE_TASKS,
        tasks: tasks
    };
};  

export const saveMyToDoTasks = (tasks) => {
    return {
        type: Const.SAVE_MY_TODO_TASKS,
        tasks: tasks
    };
};  

export const getTasks = (boardId, status) => {
    return (dispatch) => {
        switch(status) {
            case 'backLog': Api.get(`${Const.URL}/tasks/?board_id=${boardId}&status=${status}`)
                .then(res => {
                  dispatch(saveMyBackLogTasks(res.data.tasks));
                    
                })
                .catch((err) => console.log(err));
                break;
            case 'done': Api.get(`${Const.URL}/tasks/?board_id=${boardId}&status=${status}`)
                .then(res => {
                dispatch(saveMyDoneTasks(res.data.tasks));
                    
                })
                .catch((err) => console.log(err));
                break;
            case 'todo': Api.get(`${Const.URL}/tasks/?board_id=${boardId}&status=${status}`)
                .then(res => {
                dispatch(saveMyToDoTasks(res.data.tasks));
                    
                })
                .catch((err) => console.log(err));
                break;       
        }
        
    };
};

export const writeTask = (data, status, boardId, position) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/tasks/`, {data, status, boardId, position})
            .then(res => {
              dispatch(getTasks(boardId, 'backLog' ));
                
            })
            .then(res => {
                dispatch(getTasks(boardId, 'done' ));
                  
            })
            .then(res => {
                dispatch(getTasks(boardId, 'todo' ));
                  
            })
            .catch((err) => console.log(err));
            
        
                
    };
};

export const changeTask = (boardId, taskId, status, position) => {
    return (dispatch) => {
 
        Api.put(`${Const.URL}/tasks/${taskId}/board/${boardId}`, {taskId, status, boardId, position})
            .then(res => {
              const {backLogTasks, doneTasks, todoTasks} = res.data;

              backLogTasks.sort(function(a, b) {
                return a.position - b.position;
              });
              doneTasks.sort(function(a, b) {
                return a.position - b.position;
              });
              todoTasks.sort(function(a, b) {
                return a.position - b.position;
              });

              dispatch(saveMyBackLogTasks(backLogTasks));
              dispatch(saveMyDoneTasks(doneTasks));
              dispatch(saveMyToDoTasks(todoTasks));

            })
            .catch((err) => console.log(err));
            
        
                
    };
};

export const deleteTask = (taskId, boardId) => {
    return (dispatch) => {
 
        Api.del(`${Const.URL}/tasks/?task_id=${taskId}&board_id=${boardId}`)
            .then(res => {
                const {backLogTasks, doneTasks, todoTasks} = res.data;

                backLogTasks.sort(function(a, b) {
                  return a.position - b.position;
                });
                doneTasks.sort(function(a, b) {
                  return a.position - b.position;
                });
                todoTasks.sort(function(a, b) {
                  return a.position - b.position;
                });
  
                dispatch(saveMyBackLogTasks(backLogTasks));
                dispatch(saveMyDoneTasks(doneTasks));
                dispatch(saveMyToDoTasks(todoTasks));
            })
            .catch((err) => console.log(err));
            
        
                
    };
};