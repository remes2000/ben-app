import { GET_HIGHSCORES } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case GET_HIGHSCORES:
            return action.payload
        default:
            return state
    }
}