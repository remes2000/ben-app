import { FETCH_USER, INVALID_PASSWORD_OR_EMAIL, INVALID_REGISTRATION_DATA } from './types'
import axios from 'axios'

export const fetchUser = () => async dispatch => {
    const userData = await axios.get(`${process.env.REACT_APP_API_URL}/current_user`, { withCredentials: true })
    dispatch({ type: FETCH_USER, payload: userData.data})
}

export const registerUser = credentials => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, credentials, { withCredentials: true })
        .then( userData => dispatch({ type: FETCH_USER, payload: userData.data}))
        .catch( err => {

            let errors = {}

            switch(err.response.data.message){
                case 'Invalid email':
                    errors.email = 'Podany adres email jest już zajęty.'
                break
                case 'Invalid username':
                    errors.username = 'Podana nazwa użytkownika jest już zajęta.'
                break
            }

            dispatch({ type: INVALID_REGISTRATION_DATA, payload: { errors } })

        })
}

export const loginUser = credentials => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, credentials, { withCredentials: true })
        .then( userData => {
            console.log(userData)
            dispatch({ type: FETCH_USER, payload: userData.data})
        })
        .catch( err => {

            console.log(err)

            let message = ''

            switch(err.response.status){
                case 400:
                    message = 'Podane dane są nie poprawne.'
                break
            }

            dispatch({ type: INVALID_PASSWORD_OR_EMAIL, payload: { error: message } })

        })
}