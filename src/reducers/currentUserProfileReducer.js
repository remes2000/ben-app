import { GET_USER_BY_ID } from '../actions/types'

export default function( state = {}, action){
    switch(action.type){
        case GET_USER_BY_ID:
            return action.payload
        default:
            return state
    }
}