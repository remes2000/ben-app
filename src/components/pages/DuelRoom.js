import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as duelModeActions from '../../actions/duelModeActions'
import { BenGame } from 'ben-canvas-game'
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import Chat from '../Chat'
import PlayersList from '../PlayersList'

class DuelRoom extends Component{

    constructor(props){
        super(props)

        this.state = {
            answer: '',
            gaveAnswer: false,
            startGameButtonClicked: false,
            secondsLeft: 5
        }
    }

    componentWillUnmount(){
        this.props.socket.emit('disconnectUserFromRoom', this.props.duelRoom.id)
        this.props.socket.removeListener('newChatMessage')
        this.props.socket.removeListener('disconnectFromDuelRoom')
        this.props.socket.removeListener('startGame')
        this.props.socket.removeListener('answerCorrectness')
        this.props.socket.removeListener('showScoreboard')
        this.props.socket.removeListener('startNewLevel')

        this.props.clearDuelRoom()
        this.props.clearChat()
        this.props.clearPlayers()

        this.unlisten()
    }

    componentDidMount(){
        this.props.socket.on('disconnectFromDuelRoom', () => {
            this.props.history.push('/duel')
        })

        this.props.socket.on('startGame', numbers => {
            this.props.startDuelGame(numbers)
        })

        this.props.socket.on('answerCorrectness', isAnswerCorrect => {
            this.props.setAnswerCorrectness(isAnswerCorrect)
        })

        this.props.socket.on('showScoreboard', ({scoreboard, correctResult}) => {
            this.props.showScoreboard({
                scoreboard,
                correctResult
            })
        })

        this.props.socket.on('startNewLevel', room => {
            this.props.setDuelRoom(room)
            this.props.startDuelGame(room.numbers)
            this.setState({ gaveAnswer: false, secondsLeft: 5 })
        })

        this.unlisten = this.props.history.listen((location, action) => {
            if(location.pathname !== '/duel/duel_room'){
                const shouldRedirect = window.confirm('Czy napewno chcesz opuścić pokój?')
                if( !shouldRedirect ) this.props.history.push('/duel/duel_room')
            }
        })
    }

    decrementSecondsLeft = () => {

        if(!this.props.duelRoom.scoreboard) return

        this.setState( prevState => ({ secondsLeft: --prevState.secondsLeft}), () => {
            if(this.state.secondsLeft > 0)
                setTimeout(this.decrementSecondsLeft, 1000)
        })

    }

    componentDidUpdate() {
        if(this.props.duelRoom.scoreboard && this.state.secondsLeft === 5 && this.props.duelRoom.numberOfLevels !== this.props.duelRoom.level)
            setTimeout(this.decrementSecondsLeft, 1000)
    }

    renderWinners(scoreboard) {
       const highscore = scoreboard[0].points

        let winners = []

       scoreboard.forEach( player => {
            if(player.points === highscore){
                winners.push(<span style={{ fontWeight: 'bold' }}>{player.username}</span>)
                winners.push(<br />)
            }
       })

       return winners
    }

    render(){

        const { duelRoom, user, socket, players } = this.props

        return (
            <div style={styles.pageContainer}>

                { !duelRoom.started && !duelRoom.scoreboard &&
                    <div style={ { ...styles.resultContainer, ...{ width: 960, height: 600} } }>
                        <div style={styles.roomInfo}>
                            <h2 style={styles.headerStyle}>{duelRoom.name}</h2>
                            <p style={styles.gameInfo} >
                                Poziom trudności: 
                                <span style={styles.importantGameInfo}>{duelRoom.difficultyLevel}</span> 
                            </p>
                            { duelRoom.creator === user._id && players.length >=2 &&
                                <div style={styles.adminPanelStyle}>
                                    <RaisedButton 
                                        disabled={this.state.startGameButtonClicked}
                                        secondary 
                                        label="Rozpocznij grę" 
                                        onClick={ () => {
                                            socket.emit('startGame', duelRoom.id) 
                                            this.setState({ startGameButtonClicked: true })
                                        }}/>
                                    <RefreshIndicator
                                        size={40}
                                        left={0}
                                        top={0}
                                        loadingColor="#E91E63"
                                        status={ this.state.startGameButtonClicked?'loading':'hide'}
                                        style={styles.refresh}
                                    />
                                </div>
                            }
                            {   duelRoom.creator === user._id && players.length < 2 &&
                                    <div style={styles.pleaseWaitInformation}>
                                        <p>
                                            Aby rozpocząć grę, w pokoju musi się znajdować conajmniej dwóch graczy.
                                        </p>
                                    </div>
                            }
                            { duelRoom.creator !== user._id &&
                                <div style={styles.pleaseWaitInformation}>
                                    <p>
                                        Aby rozpocząć właściciel pokoju musi zatwierdzić rozpoczecie gry.
                                        W między czasie, porozmawiaj ze swoimi przeciwnikami na chacie poniżej.
                                        Powodzenia!
                                    </p>
                                </div>
                            }
                        </div>
                        <PlayersList />
                    </div>
                }

                { duelRoom.started && !duelRoom.showInputField && typeof duelRoom.isAnswerCorrect === 'undefined' &&
                    <div style={{ margin: '2.5rem 0'}}>
                        <BenGame 
                            width={900}
                            height={600}
                            numbers={duelRoom.numbers}
                            level={duelRoom.level}
                            points={duelRoom.players.find( p => p._id === user._id).points}
                            interval={ duelRoom.intervals * 1000 }
                            animationTime={ duelRoom.animationTime * 1000 }
                            timeScreen={ 5 }
                            onEndOfGame={ result => {
                                this.props.showInputField()
                            }}
                        />
                    </div>
                }

                { duelRoom.showInputField &&
                    <div style={ { ...styles.correctAnswerContainer, ...{ width: 900, height: 600} } }>
                        <h2>Podaj wynik</h2>
                            <form
                                style={styles.confirmForm}
                                onSubmit={ e => {
                                        e.preventDefault()
                                        if(!this.state.gaveAnswer)
                                            socket.emit('clientResult', { result: parseFloat(this.state.answer), roomId: duelRoom.id })
                                        this.setState({ answer: '', gaveAnswer: true})
                                }} >
                                <TextField
                                    style={styles.confirmFormSubmitButton}
                                    floatingLabelText="Wynik"
                                    type="number"
                                    value={this.state.answer}
                                    onChange={ e => this.setState({ answer: e.target.value })}
                                /> <br />
                                <RaisedButton label="sprawdź" type="submit" disabled={this.state.gaveAnswer}/>
                                <RefreshIndicator
                                    size={40}
                                    left={0}
                                    top={0}
                                    loadingColor="#E91E63"
                                    status={ this.state.gaveAnswer?'loading':'hide'}
                                    style={styles.refresh}
                                />
                            </form>
                    </div>
                }

                { typeof duelRoom.isAnswerCorrect !== 'undefined' &&
                    <div style={ { ...styles.correctAnswerContainer, ...{ width: 900, height: 600} } }>
                        { duelRoom.isAnswerCorrect && <h2>Podałeś prawidłową odpowiedź</h2>}
                        { !duelRoom.isAnswerCorrect && <h2>Podana odpowiedź nie jest prawidłowa</h2>}
                        <p>Czekamy na resztę zawodników...</p>
                        <RefreshIndicator
                            size={40}
                            left={0}
                            top={0}
                            loadingColor="#E91E63"
                            status='loading'
                            style={styles.refresh}
                        />
                    </div>
                }

                { duelRoom.scoreboard &&
                    <div style={ { ...styles.betweenLevelsStage, ...{ width: 900, height: 600} } }>
                        <div style={styles.scoreboardLeft}>
                            <p>Poprawna odpowiedź to: <span style={{ fontWeight: 'bold '}}>{duelRoom.correctResult}</span></p>
                            { duelRoom.numberOfLevels !== duelRoom.level &&
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                                    <p>Następny poziom: <span style={{ fontWeight: 'bold '}}>{duelRoom.level + 1}</span></p>
                                    <p>Zaczynamy za: <span style={{ fontWeight: 'bold '}}>{this.state.secondsLeft}</span></p>
                                </div>                              
                            }
                            {  duelRoom.numberOfLevels === duelRoom.level &&
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 'bold'}}>Koniec gry!</p>
                                    <p style={{textAlign: 'center'}}>Wygrywa: <br />
                                        {
                                            this.renderWinners(duelRoom.scoreboard)
                                        }
                                    </p>
                                    <RaisedButton label="Wyjdź" secondary containerElement={<Link to="/duel" />}/>
                                </div>
                            }
                        </div>
                        <ul style={styles.scoreList}>
                            { duelRoom.scoreboard.map( ( user, index ) => {
                                return (
                                    <li style={styles.scoreContainer} key={`user${index}`}>
                                        <span style={styles.scoreUsername}>{user.username}</span><span style={styles.scorePoints}>{user.points}</span>
                                    </li> 
                                )
                            })}
                        </ul>
                    </div>
                }

                <Chat />
            </div>
        )

    }
}

const styles = {
    resultContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        margin: '2.5rem 0'
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerStyle: {
        textAlign: 'center',
        fontSize: '3rem',
        margin: 0
    },
    gameInfo: {
        textAlgin: 'center',
        width: '100%',
        opacity: 0.7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    importantGameInfo: {
        fontSize: '1.5rem',
        opacity: 1,
        margin: '0 .5rem'
    },
    roomInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pleaseWaitInformation: {
        width: '80%',
        textAlign: 'center'
    },
    confirmForm: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    confirmFormSubmitButton: {
        width: '100%'
    },
    correctAnswerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        margin: '2.5rem 0'
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        margin: '1.5rem 0 0 0'
    },
    adminPanelStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    scoreList: {
        width: '60%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        margin: 0,
        padding: '2rem',
        overflowY: 'scroll',
        boxSizing: 'border-box'
    },
    scoreContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    scoreUsername: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        margin: '0 2rem 0 0'
    },
    scorePoints: {
        fontSize: '1.5rem',
        color: 'green'
    },
    betweenLevelsStage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        margin: '2.5rem 0'
    },
    scoreboardLeft: {
        display: 'flex',
        width: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem'
    }
}

function mapStateToProps(state) {
    return {
        duelRoom: state.duelRoom,
        socket: state.socket,
        user: state.user,
        players: state.players
    }
}

export default connect(mapStateToProps, duelModeActions)(DuelRoom)