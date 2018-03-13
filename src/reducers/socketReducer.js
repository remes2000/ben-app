import { FETCH_USER } from '../actions/types'
import io from 'socket.io-client'

export default function( state = {}, action){
    switch(action.type){
        case FETCH_USER:
            return io(process.env.REACT_APP_API_URL)
        default:
            return state
    }
}