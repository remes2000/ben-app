import { combineReducers } from 'redux'

import currentGameReducer from './currentGameReducer'

export default combineReducers({
    currentGame: currentGameReducer
})