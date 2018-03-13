import { GET_DUEL_ROOMS } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case GET_DUEL_ROOMS:
            return action.payload
        default:
            return state
    }
}