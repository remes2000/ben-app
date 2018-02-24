import { FETCH_USER, INVALID_PASSWORD_OR_EMAIL, INVALID_REGISTRATION_DATA } from './types'
import axios from 'axios'

export const fetchUser = () => async dispatch => {
    const userData = await axios.get(`${process.env.REACT_APP_API_URL}/current_user`, { withCredentials: true })
    dispatch({ type: FETCH_USER, payload: userData.data })
}

export const registerUser = credentials => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, credentials, { withCredentials: true })
        .then( userData => dispatch({ type: FETCH_USER, payload: userData.data }))
        .catch( err => {

            let errors = {}

            if( err.response && err.response.data){
                switch(err.response.data.message){
                    case 'Invalid email':
                        errors.email = 'Podany adres email jest już zajęty.'
                    break
                    default:
                        errors.email = 'Wystąpił nieoczekiwany błąd, spróbuj ponownie później!'
                        errors.username = 'Wystąpił nieoczekiwany błąd, spróbuj ponownie później!'
                    break
                }
            }

            dispatch({ type: INVALID_REGISTRATION_DATA, payload: { errors } })

        })
}

export const loginUser = credentials => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, credentials, { withCredentials: true })
        .then( userData => {
            dispatch({ type: FETCH_USER, payload: userData.data })
        })
        .catch( err => {

            let message = ''
            if( err.response && err.response.status ) {
                switch(err.response.status){
                    case 400:
                        message = 'Podane dane są nie poprawne.'
                    break
                    default:
                        message = 'Wystąpił nieoczekiwany błąd, spróbuj ponownie później!'
                    break
                }
            }

            dispatch({ type: INVALID_PASSWORD_OR_EMAIL, payload: { error: message } })

        })
}