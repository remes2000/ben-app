import { INVALID_REGISTRATION_DATA, FETCH_USER } from '../actions/types'

export default function( state = {}, action){
    switch(action.type){
        case INVALID_REGISTRATION_DATA:
            return action.payload
        case FETCH_USER:
            return {}
        default:
            return state
    }
}