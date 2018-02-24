import { combineReducers } from 'redux'

import currentGameReducer from './currentGameReducer'
import userReducer from './userReducer'
import loginFormReducer from './loginFormReducer'
import registrationFormReducer from './registrationFormReducer'
import bestPlayersReducer from './bestPlayersReducer'
import highscoresReducer from './highscoresReducer'
import currentUserProfileReducer from './currentUserProfileReducer'

export default combineReducers({
    currentGame: currentGameReducer,
    user: userReducer,
    loginForm: loginFormReducer,
    registrationForm: registrationFormReducer,
    bestPlayers: bestPlayersReducer,
    highscores: highscoresReducer,
    currentUserProfile: currentUserProfileReducer
})