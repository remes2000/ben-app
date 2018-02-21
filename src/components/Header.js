import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

import Logo from '../benlogo.svg'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class Header extends Component{

    renderGuestMenu = () => {
        return (
            <div style={styles.buttonContainer}>
                <FlatButton style={styles.buttonStyle} containerElement={<Link to="/play" />} label="Graj" />
                <FlatButton style={styles.buttonStyle} containerElement={<Link to="/login" />} label="Zaloguj się" />
            </div>
        )
    }

    renderUserMenu = () => {
        return(
            <div style={styles.buttonContainer}>
                <FlatButton style={styles.buttonStyle} containerElement={<Link to="/play" />} label="Graj" />
                <FlatButton style={styles.buttonStyle} containerElement={<a href={process.env.REACT_APP_API_URL + '/logout'} />} label="Wyloguj się" />
            </div>
        )
    }

    render(){
        return (
            <AppBar 
                iconElementLeft={
                    <div style={{ width: '80%'}}>
                        <img src={Logo} className="App-logo" alt="logo" style={{ width: '100%'}}/>
                    </div>
                }
                iconElementRight={ _.isEmpty(this.props.user) ? this.renderGuestMenu() : this.renderUserMenu()}
            />
        )
    }
}

function mapStateToProps(state){
    return { user: state.user }
}

export default connect(mapStateToProps)(Header)

const styles = {
    buttonContainer: {
        height: '100%', 
        display: 'flex', 
        alignItems: 'center'
    },
    buttonStyle: {
        color: 'white'
    }
}