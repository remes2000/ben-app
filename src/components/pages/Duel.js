import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as duelActions from '../../actions/duelModeActions'
import { Link } from 'react-router-dom'

import DuelRoomsTable from '../tables/DuelRoomsTable'
import RaisedButton from 'material-ui/RaisedButton'

class Duel extends Component{

    constructor(props){
        super(props)

        this.state = {
            selected: null,
            connecting: false,
            loading: true
        }
    }

    handleRowSelection = selectedRow => { 
        this.setState({
            selected: selectedRow.length === 0 ? null : this.props.rooms[selectedRow[0]].id
        })
    }

    isRowSelected = id => id === this.state.selected

    handleJoinRoom = roomId => {
        this.props.socket.emit('joinRoom', roomId)
        this.setState({ connecting: true })
    }

    componentDidMount(){
        this.props.socket.emit('reciveListOfDuelRooms')
        this.props.socket.on('listOfDuelRooms', rooms => {
            this.props.getDuelRooms(rooms)
            console.log('testtesttest')
            this.setState({ loading: false })
        })
        
        this.props.socket.on('joinToRoom', room => {
            this.props.setDuelRoom(room)
            this.props.freshPlayerList(room.players)
            this.props.history.push('/duel/duel_room')
        })

        this.props.socket.on('joinToRoomFailed', () => {
            this.setState({ connecting: false })
        })
    }

    componentWillUnmount(){
        this.props.socket.emit('stopReciveListOfDuelRooms')

        this.props.socket.removeListener('listOfDuelRooms')
        this.props.socket.removeListener('joinToRoom')
        this.props.socket.removeListener('joinToRoomFailed')
    }

    render(){

        return (
            <div>
                <h2 style={styles.headerStyle}>Pojedynkuj się</h2>
                { this.state.loading &&
                    <p>Loading...</p>
                }
                { !this.state.connecting && !this.state.loading &&
                    <div>
                        <div style={styles.buttonsContainer}>
                            <RaisedButton 
                                style={styles.button}
                                label="Utwórz pokój"
                                primary
                                containerElement={<Link to="/duel/create_room" />}
                            />
                        </div>
                        <DuelRoomsTable
                            handleRowSelection={this.handleRowSelection}
                            isRowSelected={this.isRowSelected} 
                            rooms={ this.props.rooms }
                            handleJoinRoom={this.handleJoinRoom}
                        />
                    </div>
                }
                { this.state.connecting &&
                    <p>Trwa łączenie...</p>
                }
            </div>
        )
    }
}

const styles = {
    headerStyle: {
        textAlign: 'center',
        margin: '5rem'
    },
    buttonsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttons: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        margin: '.25rem 0 .25rem 0'
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket,
        rooms: state.rooms
    }
}

export default connect(mapStateToProps, duelActions)(Duel)