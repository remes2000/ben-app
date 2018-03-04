import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as duelModeActions from '../actions/duelModeActions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Chat extends Component{

    constructor(props){
        super(props)
        this.state = {
            messageText: ''
        }
    }

    componentWillUnmount(){
        this.props.socket.removeListener('newChatMessage')
    }

    componentDidMount(){
        this.props.socket.on('newChatMessage', message => {
            this.props.newChatMessage(message)
        })
    }

    componentDidUpdate(){
        const chat = document.getElementById('chatDisplay')
        chat.scrollTop = chat.scrollHeight
    }

    handleSubmit = e => {
        e.preventDefault()

        if(this.state.messageText) {
            this.props.socket.emit('sendNewMessage', { message: this.state.messageText, roomId: this.props.duelRoom.id})
            this.setState({ messageText: '' })
        }
    }

    getFormattedDate = posix => {
        const date = new Date(posix)

        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
 
        return hours + ':' + minutes + ':' + seconds
    }

    render(){
        return (
            <form style={styles.form} onSubmit={this.handleSubmit}>
                <div style={styles.display} id="chatDisplay">
                    {
                        this.props.chat.map( (message, index) => (

                            <p key={`message${index}`}>
                                <span style={styles.messageDate} >{this.getFormattedDate(message.date)}</span>
                                <span style={styles.messageAuthor} >{message.author}</span>
                                {message.content}
                            </p>

                        ))
                    }
                </div>
                <div style={styles.inputPanel}>
                    <TextField
                        style={styles.textInput} 
                        hintText="Treść wiadomości"
                        style={styles.textInput}
                        value={this.state.messageText}
                        onChange={ e => this.setState({ messageText: e.target.value })}
                    />
                    <RaisedButton 
                        secondary 
                        label="Wyślij" 
                        type="submit" 
                        style={styles.submitButton}
                    />
                </div>
            </form>
        )
    }
}

const styles = {
    form: {
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        padding: '2.5rem',
        borderRadius: '2rem',
        width: '100%',
        margin: '2.5rem 0'
    },
    display: {
        height: '15rem',
        overflowY: 'scroll',
        width: '100%',
        padding: '1rem'
    },
    inputPanel: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput: {
        width: '70%'
    },
    submitButton: {
        width: '20%'
    },
    messageDate: {
        fontSize: '0.75rem',
        margin: '0 0.25rem'
    },
    messageAuthor: {
        fontWeight: 'bold',
        margin: '0 0.5rem'
    },
    messageParagraph: {
        width: '100%',
        worldBreak: 'break-all'
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket,
        chat: state.chat,
        duelRoom: state.duelRoom
    }
}

export default connect(mapStateToProps, duelModeActions)(Chat)