import { CONFIGURE_CURRENT_GAME, END_OF_LEVEL, SET_RESULT, INCREMENT_LEVEL, GAME_OVER } from '../actions/types'
import _ from 'lodash'

export default function(state = null, action) {
    switch(action.type){
        case CONFIGURE_CURRENT_GAME:
            return action.payload
        case END_OF_LEVEL:
            const newState = _.clone(state)
            newState.correctResult = action.payload
            return newState
        case SET_RESULT:
            const newStateWithAnswer = _.clone(state)
            newStateWithAnswer.isAnswerCorrect = action.payload
            return newStateWithAnswer
        case INCREMENT_LEVEL:
            const newStateWithNextLevel = _.clone(state)
            newStateWithNextLevel.level = action.payload
            delete newStateWithNextLevel.correctResult
            delete newStateWithNextLevel.isAnswerCorrect

            newStateWithNextLevel.numbers = []

            for(let i=0; i<newStateWithNextLevel.level + 1; i++){
                newStateWithNextLevel.numbers.push( (Math.floor(Math.random() * (newStateWithNextLevel.end - newStateWithNextLevel.start + 1)) + newStateWithNextLevel.start).toString() )
            }

            newStateWithNextLevel.points = newStateWithNextLevel.points + ( newStateWithNextLevel.level * 3)
            return newStateWithNextLevel
        case GAME_OVER:
            return null
        default:
            return state
    }
}