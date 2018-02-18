import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Register extends Component{
    render(){
        return (
            <div>
                <h1>Zarejestruj się</h1>
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
                        floatingLabelText="Nazwa użytkownika"
                        hintText="np TurboRower94"
                    />                    
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Hasło"
                        type="password"
                    />                    
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Powtórz hasło"
                        type="password"
                    />
                    <RaisedButton label="Zarejestruj się" secondary={true} type="submit" style={{marginTop: '2rem'}}/>
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
    }
}

export default Register