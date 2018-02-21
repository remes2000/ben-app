import { INVALID_PASSWORD_OR_EMAIL, FETCH_USER } from '../actions/types'

export default function( state = {}, action){
    switch(action.type){
        case INVALID_PASSWORD_OR_EMAIL:
            return action.payload
        case FETCH_USER:
            return {}
        default:
            return state
    }
}