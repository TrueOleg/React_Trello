import { combineReducers } from 'redux';
import auth from './loginUser';
import boards from './boards';
import users from './users';
import tasks from './tasks';
import invait from './invait';
import errors from './errors';

const rootReducer = combineReducers({
    auth,
    boards,
    tasks,
    users,
    invait,
    errors
});

export default rootReducer;