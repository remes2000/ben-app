import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '../../actions/authenticationActions'

import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component{

    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidUpdate(){
        if( this.props.loginForm.error === 400)
            this.setState({
                errors: { email: 'Podane dane są nie poprawne!', password: 'Podane dane są nie poprawne!'}
            })
    }

    onFormSubmit = e => {
        e.preventDefault()
        const errors = this.validate(this.state)
        if(_.isEmpty(errors))
            this.props.loginUser({
                email: this.state.email,
                password: this.state.password
            })
        else
            this.setState({ errors })
    }

    validate = data => {
        let errors = {}

        if(!EmailValidator.validate(data.email)) errors.email = 'Podany adres email nie jest poprawny'

        if(!data.email) errors.email = 'To pole nie może być puste!'
        if(!data.password) errors.password = 'To pole nie może być puste!'

        return errors
    }
    render(){
        return (
            <div>
                <h1>Zaloguj się</h1>
                <form onSubmit={this.onFormSubmit}>
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Adres e-mail"
                        hintText="np example@example.com"
                        type="text"
                        value={this.state.email}
                        onChange={ e => this.setState({ email: e.target.value })}
                        errorText={ this.props.loginForm.error || this.state.errors.email}
                    />
                    <br />
                    <TextField 
                        style={styles.textFieldStyle}
                        floatingLabelText="Hasło"
                        type="password"
                        value={this.state.password}
                        onChange={ e => this.setState({ password: e.target.value })}
                        errorText={ this.props.loginForm.error || this.state.errors.password}
                    />
                    <div style={styles.submitContainer}>
                        <Link to="/register">Nie posiadasz konta? Zarejestruj się!</Link> <br />
                        <RaisedButton label="Zaloguj się" secondary={true} type="submit" style={{marginTop: '2rem'}}/>
                    </div>
                    <div style={styles.socialButtonsContainer}>
                        <a href={process.env.REACT_APP_API_URL + '/auth/facebook'} style={styles.socialButtonAnhor}>
                            <FacebookLoginButton style={styles.socialButton} />
                        </a>
                        <a href={process.env.REACT_APP_API_URL + '/auth/google'} style={styles.socialButtonAnhor}>
                            <GoogleLoginButton style={styles.socialButton} />
                        </a>
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
    },
    socialButtonAnhor: {
        textDecoration: 'none'
    }
}


function mapStateToProps(state){
    return { loginForm: state.loginForm }
}

export default connect(mapStateToProps, actions)(Login)