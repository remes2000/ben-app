import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component{
    render(){
        return (
            <div>
                <h1>Zaloguj się</h1>
                <form>
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Adres e-mail"
                        hintText="np example@example.com"
                        type="email"
                    />
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Hasło"
                        type="password"
                    />
                    <div style={styles.submitContainer}>
                        <Link to="/register">Nie posiadasz konta? Zarejestruj się!</Link> <br />
                        <RaisedButton label="Zaloguj się" secondary={true} type="submit" style={{marginTop: '2rem'}}/>
                    </div>
                    <div style={styles.socialButtonsContainer}>
                        <FacebookLoginButton style={styles.socialButton} />
                        <GoogleLoginButton style={styles.socialButton} />
                    </div>
                </form>
            </div>
        )
    }
}

const styles = {
    textFieldStyle: {
        width: '100%'
    },
    submitContainer: {
        marginTop: '3rem'
    },
    socialButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',
        width: '50%'
    },
    socialButton: {
        margin: 0
    }
}

export default Login