import { GET_AVALIABLE_ACHIEVEMENTS } from '../actions/types'

export default function( state = [], action){
    switch(action.type){
        case GET_AVALIABLE_ACHIEVEMENTS:
            return action.payload
        default:
            return state
    }
}