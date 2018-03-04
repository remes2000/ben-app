import { OPEN_SOCKET } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case OPEN_SOCKET:
            return action.payload
        default:
            return state
    }
}