import { CONFIGURE_CURRENT_GAME, END_OF_LEVEL, SET_RESULT, INCREMENT_LEVEL, GAME_OVER } from './types'
import _ from 'lodash'

export const configureCurrentGame = (data, width, height) => dispatch => {
    let payload = {}

    payload.width = width
    payload.height = height

    switch (data.difficultyLevel){
        case 'easy':
            payload.intervals = 1
            payload.animationTime = 0.2
            payload.start = -9
            payload.end = 9
        break
        case 'normal':
            payload.intervals = 1
            payload.animationTime = 0.2  
            payload.start = -30
            payload.end = 30
        break
        case 'hard':
            payload.intervals = 1
            payload.animationTime = 0.2
            payload.start = -100
            payload.end = 100
        break
        case 'custom':
            payload.intervals = data.intervals
            payload.animationTime = data.animationTime
            payload.start = parseInt(data.start)
            payload.end = parseInt(data.end)
        break
        default:
        break
    }

    payload.points = 0
    payload.level = 1
    payload.numbers = []

    for(let i=0; i<payload.level + 1; i++){
        payload.numbers.push( (Math.floor(Math.random() * (payload.end - payload.start + 1)) + payload.start).toString() )
    }

    dispatch({type: CONFIGURE_CURRENT_GAME, payload})
}

export const endOfLevel = correctResult => dispatch => {
    dispatch({ type: END_OF_LEVEL, payload: correctResult })
}

export const setResult = (result, correctResult) => dispatch => {
    console.log(result)
    console.log(correctResult)
    console.log(result == correctResult)
    dispatch({ type: SET_RESULT, payload: ( result == correctResult ) })
}

export const incrementLevel = currentLevel => dispatch => {
    dispatch({ type: INCREMENT_LEVEL, payload: ++currentLevel })
}

export const gameOver = () => dispatch => {
    dispatch( { type: GAME_OVER } )
}


