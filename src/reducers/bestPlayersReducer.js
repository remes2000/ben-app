import { GET_BEST_PLAYERS } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case GET_BEST_PLAYERS:
            return action.payload
        default:
            return state
    }
}