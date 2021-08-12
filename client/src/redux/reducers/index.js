import { combineReducers } from 'redux'
import auth from './authReducer'
import notifyReducer from './notifyReducer'
import theme from './themeReducer'
export default combineReducers({
    auth,
    notifyReducer,
    theme
})