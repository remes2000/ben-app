import { GET_BEST_PLAYERS, GET_HIGHSCORES, GET_USER_BY_ID, GET_AVALIABLE_ACHIEVEMENTS } from './types'
import axios from 'axios'

export const getBestPlayers = () => async dispatch => {
    const bestPlayers = await axios.get(`${process.env.REACT_APP_API_URL}/api/best_players`)
    dispatch({ type: GET_BEST_PLAYERS, payload: bestPlayers.data })
}

export const getHighscores = difficultyLevel => async dispatch => {
    const highscores = await axios.get(`${process.env.REACT_APP_API_URL}/api/highscores?difficultyLevel=${difficultyLevel}`)
    dispatch({ type: GET_HIGHSCORES, payload: highscores.data })
}

export const getUserById = id => async dispatch => {
    const user = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_user_by_id?userId=${id}`)
    dispatch({ type: GET_USER_BY_ID, payload: user.data})
}

export const getAvaliableAchievements = () => async dispatch => {
    const achievements = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_achievements`)
    dispatch({ type: GET_AVALIABLE_ACHIEVEMENTS, payload: achievements.data })
}