import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '../../actions/currentGameActions'
import { Prompt } from 'react-router-dom'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { BenGame } from 'ben-canvas-game'

class Play extends Component{
    constructor(){
        super()

        this.state = {
            difficultyLevel: 'normal',
            intervals: '',
            animationTime: '',
            start: '',
            end: '',
            answer: '',
            errors: {}
        }
    }

    componentWillMount(){
        this.unlisten = this.props.history.listen((location, action) => {
            this.props.gameOver()
        })
    }

    componentWillUnmount(){
        this.unlisten()
    }

    validate = data => {
        let errors = {}
        if(data.difficultyLevel === 'custom'){
            if(isNaN(parseFloat(data.intervals))) errors.intervals = 'Podana wartość nie jest liczbą'
            if(isNaN(parseFloat(data.animationTime))) errors.animationTime = 'Podana wartość nie jest liczbą'
            if(isNaN(parseFloat(data.start))) errors.start = 'Podana wartość nie jest liczbą'
            if(isNaN(parseFloat(data.end))) errors.end = 'Podana wartość nie jest liczbą'

            if(!data.intervals) errors.intervals = 'To pole jest wymagane!'
            if(!data.animationTime) errors.animationTime = 'To pole jest wymagane!'
            if(!data.start) errors.start = 'To pole jest wymagane!'
            if(!data.end) errors.end = 'To pole jest wymagane!'
        }
        return errors
    }

    onFormSubmit = (e) => {
        e.preventDefault()

        const errors = this.validate(this.state)

        if(!_.isEmpty( errors )) {
            this.setState({ errors })
            return
        }

        this.props.configureCurrentGame(this.state, 960, 600)

    }

    render() {

        const currentGame = this.props.currentGame

        return (
            <div>
                <Prompt 
                    when={ !!this.props.currentGame }
                    message="Czy napewno chcesz opuścić tę stronę ? Postęp w grze zostanie utracony."
                />
                <h1 style={{textAlign: 'center', margin: '4rem', fontSize: '3rem'}}>Graj w Ben</h1>
                { !currentGame &&
                    <form onSubmit={this.onFormSubmit}>
                        <h2>Wybierz poziom trudnośći:</h2>
                        <RadioButtonGroup
                            name="difficultyLevel"
                            onChange={e => { this.setState({difficultyLevel: e.target.value}) } }
                            valueSelected={this.state.difficultyLevel}
                        >
                            <RadioButton 
                                value="easy"
                                label="Łatwy"
                            />
                            <RadioButton 
                                value="normal"
                                label="Normalny"
                            />
                            <RadioButton 
                                value="hard"
                                label="Trudny"
                            />
                            <RadioButton
                                value="custom"
                                label="Ustawienia własne"
                            />
                        </RadioButtonGroup>
                        { this.state.difficultyLevel === 'custom' && 
                            <div>
                                <TextField 
                                    floatingLabelText="Czas pomiędzy liczbami (s)"
                                    hintText="np 2"
                                    type="number"
                                    errorText={this.state.errors.intervals}
                                    onChange={ e => {this.setState({intervals: e.target.value})} }
                                    value={this.state.intervals}
                                />
                                <br />
                                <TextField 
                                    floatingLabelText="Czas trwania animacji (s)"
                                    hintText="np 0.1"
                                    type="number"
                                    errorText={this.state.errors.animationTime}
                                    onChange={ e => {this.setState({animationTime: e.target.value})} }
                                    value={this.state.animationTime}
                                />
                                <br />
                                Od: 
                                <TextField
                                    floatingLabelText="Początek zakresu"
                                    hintText="np -12"
                                    type="number"
                                    style={{margin: '2rem'}}
                                    errorText={this.state.errors.start}
                                    onChange={ e => {this.setState({start: e.target.value})} }
                                    value={this.state.start}
                                />
                                Do: 
                                <TextField
                                    floatingLabelText="Koniec zakresu"
                                    hintText="np 30"
                                    type="number"
                                    style={{margin: '2rem'}}
                                    errorText={this.state.errors.end}
                                    onChange={ e => {this.setState({end: e.target.value})} }
                                    value={this.state.end}
                                />
                            </div>
                        }
                        <RaisedButton label="Rozpocznij grę" secondary={true} style={{marginTop: '5rem'}} type="submit"/>
                    </form>
                }
                { currentGame && typeof currentGame.correctResult === 'undefined' &&
                    <BenGame 
                        width={currentGame.width}
                        height={currentGame.height}
                        numbers={currentGame.numbers}
                        level={currentGame.level}
                        points={currentGame.points}
                        interval={ parseFloat(currentGame.intervals) * 1000}
                        animationTime={ parseFloat(currentGame.animationTime) * 1000}
                        welcomeScreenText="Naciśnij przycisk, gdy będziesz gotowy!"
                        onEndOfGame={ result => {
                            this.props.endOfLevel(result)
                        }}
                    />
                }
                { currentGame && typeof currentGame.correctResult !== 'undefined' && typeof currentGame.isAnswerCorrect === 'undefined' &&
                    <div style={ { ...styles.resultContainer, ...{ width: currentGame.width, height: currentGame.height} } }>
                        <h2>Podaj wynik</h2>
                        <form
                        style={styles.confirmForm}
                        onSubmit={ () => {
                             this.props.setResult( this.state.answer, currentGame.correctResult)
                             this.setState({ answer: ''})
                        }} >
                            <TextField
                                style={styles.confirmFormSubmitButton}
                                floatingLabelText="Wynik"
                                type="number"
                                value={this.state.answer}
                                onChange={ e => this.setState({ answer: e.target.value })}
                            /> <br />
                            <RaisedButton label="sprawdź" type="submit"/>
                        </form>
                    </div>
                }
                { currentGame && typeof currentGame.isAnswerCorrect !== 'undefined' &&
                    <div>
                        { currentGame.isAnswerCorrect && !currentGame.gameOverButNotLoose &&
                            <div style={ { ...styles.correctAnswerContainer, ...{ width: currentGame.width, height: currentGame.height} } }>
                                <h2>Poprawna odpowiedź!</h2>
                                <div style={styles.correctAnswerButtonsContainer} >
                                    <RaisedButton label="Koniec gry" backgroundColor="#EF5350" labelStyle={{ color: 'white'}} onClick={ () => this.props.gameOverButNotLoose() }/>
                                    <RaisedButton autoFocus label="Graj dalej!" primary onClick={ () => this.props.incrementLevel(currentGame.level) }/>
                                </div>
                            </div>
                        }
                        { !currentGame.isAnswerCorrect && !currentGame.gameOverButNotLoose && 
                            <div style={ { ...styles.gameOverContainer, ...{ width: currentGame.width, height: currentGame.height} } }>
                                <h2>Koniec gry!</h2>
                                <p style={styles.sumOfPointsContainer}>Poprawna odpowiedź to: <span style={styles.points}>{currentGame.correctResult}</span></p>
                                <p style={styles.sumOfPointsContainer}> Zdobyłeś: 
                                    <span style={styles.points}>{currentGame.points}</span>
                                    punktów!
                                </p>
                                { !_.isEmpty(this.props.user) && currentGame.difficultyLevel !== 'custom' &&
                                    <div style={{ width: '40%'}}>
                                        <RaisedButton label="Zapisz wynik" 
                                                backgroundColor="#9CCC65" 
                                                labelStyle={{ color: 'white'}} 
                                                style={{ width: '100%' }}
                                                onClick={() => { 
                                                    this.props.addNewHighscore( currentGame.points, currentGame.difficultyLevel )
                                                    this.props.gameOver()
                                                }}
                                        />
                                        <RaisedButton label="Dodaj punkty do profilu" 
                                                backgroundColor="#9CCC65" 
                                                labelStyle={{ color: 'white'}} 
                                                style={{ width: '100%' }}
                                                onClick={() => { 
                                                    this.props.pushResult( currentGame.points ) 
                                                    this.props.gameOver()
                                                }}
                                        />
                                    </div>
                                }
                                <RaisedButton label="Jeszcze raz!" style={styles.onceAgainButton} primary onClick={ () => this.props.gameOver() } />
                            </div>
                        }
                        { currentGame.gameOverButNotLoose &&
                            <div style={ { ...styles.gameOverButNotLooseContainer, ...{ width: currentGame.width, height: currentGame.height} } }>
                                <h2>Koniec gry!</h2>
                                <p style={styles.sumOfPointsContainer}> Zdobyłeś: 
                                    <span style={styles.points}>{currentGame.points}</span>
                                    punktów!
                                </p>
                                { !_.isEmpty(this.props.user) && currentGame.difficultyLevel !== 'custom' &&
                                    <div style={{ width: '40%' }}>
                                        <RaisedButton label="Zapisz wynik" 
                                                backgroundColor="#9CCC65" 
                                                labelStyle={{ color: 'white'}} 
                                                style={{ width: '100%' }}
                                                onClick={() => { 
                                                    this.props.addNewHighscore( currentGame.points, currentGame.difficultyLevel )
                                                    this.props.gameOver()
                                                }}
                                        />
                                        <RaisedButton label="Dodaj punkty do profilu" 
                                                backgroundColor="#9CCC65" 
                                                labelStyle={{ color: 'white'}} 
                                                style={{ width: '100%' }}
                                                onClick={() => { 
                                                    this.props.pushResult( currentGame.points ) 
                                                    this.props.gameOver()
                                                }}
                                        />
                                    </div>
                                }
                                <RaisedButton label="Jeszcze raz!" style={styles.onceAgainButton} primary onClick={ () => this.props.gameOver() } />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    resultContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
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
        backgroundColor: '#9CCC65',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    correctAnswerButtonsContainer: {
        margin: '0 auto',
        marginTop: '3rem',
        width: '40%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    gameOverContainer: {
        backgroundColor: '#FF7043',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    sumOfPointsContainer: {
        fontSize: '2rem'
    },
    points: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginRight: '1rem',
        marginLeft: '1rem'
    },
    onceAgainButton: {
        width: '40%',
        marginTop: '2rem'
    },
    gameOverButNotLooseContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        backgroundColor: "#00BCD4"
    }
}
function mapStateToProps(state){
    return { currentGame: state.currentGame, user: state.user }
}

export default connect(mapStateToProps, actions)(Play)