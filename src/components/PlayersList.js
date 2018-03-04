import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as duelModeActions from '../actions/duelModeActions'

class PlayersList extends Component{

    componentDidMount(){
        this.props.socket.on('newPlayerList', playerList => {
            this.props.freshPlayerList(playerList)
        })
    }

    renderPlayerListItem = player => {
        return (
            <li style={styles.listItemStyles} key={`player${player.id}`}>
                <Link to={`/profile/${player.id}`} style={styles.anchorStyle}>{player.username}</Link>
            </li>
        )
    }

    render(){
        return (
            <ul style={styles.listStyles} >
                {
                    this.props.players.map( player => this.renderPlayerListItem(player))
                }
            </ul>
        )
    }
}

const styles = {
    listStyles: {
        backgroundColor: '#f0f0f0',
        height: '100%',
        margin: 0,
        padding: '1rem',
        listStyleType: 'none',
        overflowY: 'scroll',
        boxSizing: 'border-box'
    },
    listItemStyles: {
        margin: '0.5rem'
    },
    anchorStyle: {
        color: 'black',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket,
        players: state.players
    }
}

export default connect(mapStateToProps, duelModeActions)(PlayersList)