import { CONFIGURE_CURRENT_GAME, END_OF_LEVEL, SET_RESULT, INCREMENT_LEVEL, GAME_OVER, GAME_OVER_BUT_NOT_LOOSE } from '../actions/types'
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

            if(newStateWithAnswer.isAnswerCorrect){

                switch (newStateWithAnswer.difficultyLevel){
                    case 'easy':
                        newStateWithAnswer.points += newStateWithAnswer.level + 1
                    break
                    case 'normal':
                        newStateWithAnswer.points += ( newStateWithAnswer.level + 1 ) * 2
                    break
                    case 'hard':
                        newStateWithAnswer.points += ( newStateWithAnswer.level + 1 ) * 3
                    break
                    default:
                        newStateWithAnswer.points = 0
                    break
                }

            }
            
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
            return newStateWithNextLevel
        case GAME_OVER:
            return null
        case GAME_OVER_BUT_NOT_LOOSE:
            const gameOverButNotLoose = _.clone(state)
            gameOverButNotLoose.gameOverButNotLoose = true
            return gameOverButNotLoose
        default:
            return state
    }
}