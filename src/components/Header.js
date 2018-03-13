import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FETCH_IS_PENDING } from '../actions/types'

import Logo from '../svg/benlogo.svg'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AssignmentReturn from 'material-ui/svg-icons/action/assignment-return'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import ViewColumn from 'material-ui/svg-icons/action/view-column'
import ViewAgenda from 'material-ui/svg-icons/action/view-agenda'
import CardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

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
                <p style={styles.usernameParagraph}>{this.props.user.username}</p>
                <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <MoreVertIcon color="white"/>
                        </IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Graj" rightIcon={ <PlayArrow /> } containerElement={<Link to="/play" />} />
                    <MenuItem primaryText="Pojedynkuj się" rightIcon={ <PlayArrow /> } containerElement={ <Link to="/duel" /> } />
                    <Divider />
                    <MenuItem primaryText="Tabela wyników" rightIcon={ <ViewColumn /> } containerElement={<Link to="/highscores" />} />
                    <MenuItem primaryText="Najlepsi gracze" rightIcon={ <ViewAgenda /> } containerElement={<Link to="/top" />} />
                    <MenuItem primaryText="Achievementy" rightIcon={ <CardGiftcard /> } containerElement={ <Link to={`/achievements/${this.props.user._id}`} /> } />
                    <Divider />
                    <MenuItem primaryText="Profil" rightIcon={ <AccountCircle /> } containerElement={<Link to={`/profile/${this.props.user._id}`} />} />
                    <MenuItem primaryText="Wyloguj się" rightIcon={<AssignmentReturn />} containerElement={<a href={process.env.REACT_APP_API_URL + '/logout'} style={styles.anchorStyle} />} />
                </IconMenu>
            </div>
        )
    }

    render(){
        return (
            <AppBar 
                iconElementLeft={
                    <div style={{ width: '80%'}}>
                        <Link to="/">
                            <img src={Logo} className="App-logo" alt="logo" style={{ width: '100%'}}/>
                        </Link>
                    </div>
                }
                iconElementRight={ 
                    _.isEmpty(this.props.user)?this.renderGuestMenu():this.props.user===FETCH_IS_PENDING?<div>Loading...</div>:this.renderUserMenu()
                }
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
    },
    anchorStyle: {
        textDecoration: 'none'
    },
    menuButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    usernameParagraph: {
        color: 'white'
    }
}