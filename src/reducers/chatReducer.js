import { NEW_CHAT_MESSAGE, CLEAR_CHAT } from '../actions/types'
import _ from 'lodash'

export default function( state = [], action){
    switch(action.type){
        case NEW_CHAT_MESSAGE:
            const message = action.payload
            const newChatContent = _.clone(state)
            newChatContent.push({ author: message.author, date: message.date, content: message.content})
        return newChatContent
        case CLEAR_CHAT:
            return []
        default:
            return state
    }
}