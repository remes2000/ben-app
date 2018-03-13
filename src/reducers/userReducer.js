import { FETCH_USER, FETCH_IS_PENDING } from '../actions/types'

export default function( state = {}, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload
        case FETCH_IS_PENDING:
            return FETCH_IS_PENDING
        default:
            return state
    }
}