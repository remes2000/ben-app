import { combineReducers } from 'redux'

import currentGameReducer from './currentGameReducer'
import userReducer from './userReducer'
import loginFormReducer from './loginFormReducer'
import registrationFormReducer from './registrationFormReducer'

export default combineReducers({
    currentGame: currentGameReducer,
    user: userReducer,
    loginForm: loginFormReducer,
    registrationForm: registrationFormReducer
})