import { FRESH_PLAYER_LIST, CLEAR_PLAYERS } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case FRESH_PLAYER_LIST:
            return action.payload
        case CLEAR_PLAYERS:
            return []
        default:
            return state
    }
}