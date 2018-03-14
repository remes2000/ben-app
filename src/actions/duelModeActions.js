import { GET_DUEL_ROOMS, SET_DUEL_ROOM, NEW_CHAT_MESSAGE, FRESH_PLAYER_LIST, CLEAR_DUEL_ROOM, 
        CLEAR_CHAT, CLEAR_PLAYERS, START_DUEL_GAME, SHOW_INPUT_FIELD, SET_ANSWER_CORRECTNESS, SHOW_SCOREBOARD } from './types'

export const getDuelRooms = tables => dispatch => {
    dispatch({ type: GET_DUEL_ROOMS, payload: tables })
}

export const setDuelRoom = room => dispatch => {
    dispatch({ type: SET_DUEL_ROOM, payload: room })
}

export const newChatMessage = message => dispatch => {
    dispatch({ type: NEW_CHAT_MESSAGE, payload: message })
}

export const freshPlayerList = playerList => dispatch => {
    dispatch({ type: FRESH_PLAYER_LIST, payload: playerList })
}

export const clearDuelRoom = () => dispatch => {
    dispatch({ type: CLEAR_DUEL_ROOM })
}

export const clearPlayers = () => dispatch => {
    dispatch({ type: CLEAR_PLAYERS })
}

export const clearChat = () => dispatch => {
    dispatch({ type: CLEAR_CHAT })
}

export const startDuelGame = numbers => dispatch => {
    dispatch({ type: START_DUEL_GAME, payload: numbers })
}

export const showInputField = () => dispatch => {
    dispatch({ type: SHOW_INPUT_FIELD })
}

export const setAnswerCorrectness = isAnswerCorrect => dispatch => {
    dispatch({ type: SET_ANSWER_CORRECTNESS, payload: isAnswerCorrect})
}

export const showScoreboard = data => dispatch => {
    dispatch({ type: SHOW_SCOREBOARD, payload: data })
}