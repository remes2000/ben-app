import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import _ from 'lodash'
import * as actions from '../../actions/authenticationActions'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            errors: {}
        }
    }

    onFormSubmit = e => {
        e.preventDefault()
        const errors = this.validate(this.state)
        if(_.isEmpty(errors))
            this.props.registerUser({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        else
            this.setState({ errors })
    }

    validate = data => {
        let errors = {}

        if(data.password !== data.repeatPassword){
            errors.password = 'Hasło i jego powtórzenie nie są takie same.'
            errors.repeatPassword = 'Hasło i jego powtórzenie nie są takie same.'
        }

        if(!EmailValidator.validate(data.email)) errors.email = 'Podany adres email nie jest poprawny'

        if(!data.email) errors.email = 'To pole nie może być puste!'
        if(!data.username) errors.username = 'To pole nie może być puste!'
        if(!data.password) errors.password = 'To pole nie może być puste!'
        if(!data.repeatPassword) errors.repeatPassword = 'To pole nie może być puste!'

        return errors
    }

    render(){

        let emailError = null
        let usernameError = null

        const registrationErrors = this.props.registrationForm.errors

        if(registrationErrors){
            emailError = registrationErrors.email
            usernameError = registrationErrors.username
        }

        return (
            <div>
                <h1>Zarejestruj się</h1>
                <form onSubmit={this.onFormSubmit}>
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Adres e-mail"
                        hintText="np example@example.com"
                        type="email"
                        value={this.state.email}
                        onChange={ e => this.setState({ email: e.target.value})}
                        errorText={ emailError || this.state.errors.email}
                    />
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Nazwa użytkownika"
                        hintText="np TurboRower94"
                        value={this.state.username}
                        onChange={ e => this.setState({ username: e.target.value})}
                        errorText={ usernameError || this.state.errors.username}
                    />                    
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Hasło"
                        type="password"
                        value={this.state.password}
                        onChange={ e => this.setState({ password: e.target.value})}
                        errorText={this.state.errors.password}
                    />                    
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Powtórz hasło"
                        type="password"
                        value={this.state.repeatPassword}
                        onChange={ e => this.setState({ repeatPassword: e.target.value})}
                        errorText={this.state.errors.repeatPassword}
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

function mapStateToProps(state){
    return { registrationForm: state.registrationForm }
}

export default connect(mapStateToProps, actions)(Register)