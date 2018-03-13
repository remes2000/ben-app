import { combineReducers } from 'redux'

import currentGameReducer from './currentGameReducer'
import userReducer from './userReducer'
import loginFormReducer from './loginFormReducer'
import registrationFormReducer from './registrationFormReducer'
import bestPlayersReducer from './bestPlayersReducer'
import highscoresReducer from './highscoresReducer'
import currentUserProfileReducer from './currentUserProfileReducer'
import socketReducer from './socketReducer'
import roomsReducer from './roomsReducer'
import duelRoomReducer from './duelRoomReducer'
import chatReducer from './chatReducer'
import playersReducer from './playersReducer'
import avaliableAchievementsReducer from './avaliableAchievementsReducer'

export default combineReducers({
    currentGame: currentGameReducer,
    user: userReducer,
    loginForm: loginFormReducer,
    registrationForm: registrationFormReducer,
    bestPlayers: bestPlayersReducer,
    highscores: highscoresReducer,
    currentUserProfile: currentUserProfileReducer,
    socket: socketReducer,
    rooms: roomsReducer,
    duelRoom: duelRoomReducer,
    chat: chatReducer,
    players: playersReducer,
    avaliableAchievements: avaliableAchievementsReducer
})