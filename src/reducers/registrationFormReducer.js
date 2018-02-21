import { INVALID_REGISTRATION_DATA } from '../actions/types'

export default function( state = {}, action){
    switch(action.type){
        case INVALID_REGISTRATION_DATA:
            return action.payload
        default:
            return state
    }
}