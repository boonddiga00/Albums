import { combineReducers } from 'redux';
import authReducer from 'Store/Reducers/authReducer';
import projectReducer from 'Store/Reducers/projectReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
});

export default rootReducer;