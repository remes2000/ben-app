import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as duelModeActions from '../../actions/duelModeActions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RefreshIndicator from 'material-ui/RefreshIndicator'

class CreateDuelRoom extends Component{

    constructor(props){
        super(props)

        this.state = {
            difficultyLevel: 'normal',
            name: '',
            slots: 2,
            numberOfLevels: 5,
            intervals: '',
            animationTime: '',
            start: '',
            end: '',
            loading: false,
            errors: {}
        }
    }

    componentDidMount(){
        this.setState({
            name: `Pokój ${this.props.user.username}` 
        })
    }

    validate = data => {

        let errors = {}
        
        if(!data.name) errors.name = 'To pole jest wymagane!'

        if(isNaN(parseFloat(data.slots))) errors.slots = 'Podana wartość nie jest liczbą'
        if(isNaN(parseFloat(data.numberOfLevels))) errors.numberOfLevels = 'Podana wartość nie jest liczbą'
        if(data.slots < 2) errors.slots = 'Liczba slotów musi być równa lub większa 2'
        if(!data.slots) errors.slots = 'To pole jest wymagane!'

        if(data.numberOfLevels < 3) errors.numberOfLevels = 'Ilość poziomów musi być większa lub równa 3'
        if(!data.numberOfLevels) errors.numberOfLevels = 'To pole jest wymagane'

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

    onFormSubmit = e => {
        e.preventDefault()
        const data = _.clone(this.state)
        const errors = this.validate(data)
        if(_.isEmpty(errors)){
            this.props.socket.emit('createNewRoom', data)
            this.setState({ loading: true })
            this.props.socket.on('joinToRoom', room => {
                this.props.setDuelRoom(room)
                this.props.freshPlayerList(room.players)
                this.props.history.push('/duel/duel_room')
            })
        }
        else
            this.setState({ errors })
    }

    render(){
        return (
            <div>
                <h2 style={styles.headerStyle}>Stwórz pokój</h2>
                <form style={styles.formStyle} onSubmit={this.onFormSubmit}>
                    <TextField
                        style={styles.fieldStyle} 
                        floatingLabelText="Nazwa pokoju *"
                        value={this.state.name}
                        onChange={ e => this.setState({ name: e.target.value }) }
                        errorText={this.state.errors.name}
                    /> <br />
                    <TextField
                        style={styles.fieldStyle} 
                        floatingLabelText="Ilośc slotów *"
                        type="number"
                        value={this.state.slots}
                        onChange={ e => this.setState({ slots: e.target.value }) }
                        errorText={this.state.errors.slots}
                    /> <br />
                    <TextField
                        style={styles.fieldStyle} 
                        floatingLabelText="Ilośc poziomów*"
                        type="number"
                        value={this.state.numberOfLevels}
                        onChange={ e => this.setState({ numberOfLevels: e.target.value }) }
                        errorText={this.state.errors.numberOfLevels}
                    /> <br />
                    <SelectField
                        style={styles.fieldStyle} 
                        floatingLabelText="Poziom trudności *"
                        value={this.state.difficultyLevel}
                        onChange={ (event, index, value) => this.setState({ difficultyLevel: value}) }
                    >
                        <MenuItem value="easy" primaryText="Łatwy" />
                        <MenuItem value="normal" primaryText="Normalny" />
                        <MenuItem value="hard" primaryText="Trudny" />
                        <MenuItem value="custom" primaryText="Ustawienia własne" />
                    </SelectField> <br />

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

                    <RaisedButton secondary type="submit" label="Utwórz" style={ { ...styles.submitButtonStyle, ...{ display: this.state.loading ? 'none' : 'inline-block' } }} />
                    <RefreshIndicator
                        size={40}
                        left={0}
                        top={0}
                        loadingColor="#E91E63"
                        status={ this.state.loading ? 'loading' : 'hide'}
                        style={styles.refresh}
                    />
                </form>
            </div>
        )
    }
}

const styles = {
    headerStyle: {
        textAlign: 'center',
        margin: '5rem'
    },
    formStyle: {
        width: '100%'
    },
    fieldStyle: {
        width: '100%'
    },
    submitButtonStyle: {
        margin: '1.5rem 0',
        padding: 0
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        margin: '1.5rem 0 0 0'
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        socket: state.socket
    }
}

export default connect(mapStateToProps, duelModeActions)(CreateDuelRoom)