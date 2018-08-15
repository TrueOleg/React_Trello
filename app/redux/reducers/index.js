import { combineReducers } from 'redux';
import auth from './loginUser';
import boards from './boards';
import users from './users';
import tasks from './tasks';
import invait from './invait';

const rootReducer = combineReducers({
    auth,
    boards,
    tasks,
    users,
    invait
});

export default rootReducer;