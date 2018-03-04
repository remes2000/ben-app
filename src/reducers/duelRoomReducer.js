import { SET_DUEL_ROOM, CLEAR_DUEL_ROOM, START_DUEL_GAME, SHOW_INPUT_FIELD, SET_ANSWER_CORRECTNESS, SHOW_SCOREBOARD } from '../actions/types'
import _ from 'lodash'

export default function( state = {}, action){
    switch(action.type){
        case SET_DUEL_ROOM:
            return action.payload
        case START_DUEL_GAME:
            const startedGame = _.clone(state)
            startedGame.started = true
            startedGame.numbers = action.payload
            return startedGame
        case SHOW_INPUT_FIELD:
            const gameWithInputField = _.clone(state)
            gameWithInputField.showInputField = true
            return gameWithInputField
        case SET_ANSWER_CORRECTNESS:
            const gameWithAnswerCorrectness = _.clone(state)
            gameWithAnswerCorrectness.isAnswerCorrect = action.payload
            delete gameWithAnswerCorrectness.showInputField
            return gameWithAnswerCorrectness
        case SHOW_SCOREBOARD:
            const newStateWithScoreboard = _.clone(state)
            newStateWithScoreboard.scoreboard = action.payload.scoreboard
            newStateWithScoreboard.correctResult = action.payload.correctResult
            delete newStateWithScoreboard.isAnswerCorrect
            newStateWithScoreboard.started = false
            return newStateWithScoreboard
        case CLEAR_DUEL_ROOM:
            return {}
        default:
            return state
    }
}