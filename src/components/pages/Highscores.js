import React, { Component } from 'react'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

import { connect } from 'react-redux'
import * as actions from '../../actions/actions'

import HighscoresTable from '../tables/HighscoresTable'

class Highscores extends Component{

    constructor(props){
        super(props)

        this.state = {
            difficultyLevel: 'easy'
        }
    }

    componentDidMount(){
        this.props.getHighscores(this.state.difficultyLevel)
    }

    render(){
        return(
            <div>
                <h1 style={styles.headerStyle}>Tabela wyników</h1>
                <div style={styles.radioButtonsContainer}>
                    <RadioButtonGroup 
                        style={styles.radioButtonsGroup}
                        onChange={e => { 
                            this.setState({difficultyLevel: e.target.value},
                                () => this.props.getHighscores(this.state.difficultyLevel))
                        }}
                        valueSelected={this.state.difficultyLevel}
                        name="difficultyLevel"
                    >
                        <RadioButton
                            style={styles.radioButton}
                            value="easy"
                            label="łatwy"
                        />
                        <RadioButton
                            style={styles.radioButton}
                            value="normal"
                            label="normalny"
                        />
                        <RadioButton
                            style={styles.radioButton}
                            value="hard"
                            label="trudny"
                        />
                    </RadioButtonGroup>
                </div>

                <HighscoresTable 
                    highscores={this.props.highscores}
                />

            </div>
        )
    }
}

const styles = {
    headerStyle: {
        textAlign: 'center',
        marginTop: '5rem'
    },
    radioButton: {
        width: 'auto'
    },
    radioButtonsGroup: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '3rem'
    },
}

function mapStateToProps(state) {
    return {
        highscores: state.highscores
    }
}

export default connect( mapStateToProps, actions )(Highscores)