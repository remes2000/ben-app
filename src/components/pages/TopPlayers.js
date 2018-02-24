import React, { Component } from 'react'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'

import * as actions from '../../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TopPlayers extends Component{

    componentDidMount(){
        this.props.getBestPlayers()
    }

    renderUserRow = (user, index) => {
        return (
            <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/profile/${user._id}`}>{user.username}</Link>
                </TableRowColumn>
                <TableRowColumn>{user.points}</TableRowColumn>
                <TableRowColumn>{user.numberOfGames}</TableRowColumn>
                <TableRowColumn>{parseFloat(user.points/user.numberOfGames)}</TableRowColumn>
            </TableRow>
        )
    }

    render(){
        return (
            <div>
                <h1 style={styles.header}>Najlepsi zawodnicy:</h1>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Miejsce</TableHeaderColumn>
                            <TableHeaderColumn>Gracz</TableHeaderColumn>
                            <TableHeaderColumn>Ilość punktów</TableHeaderColumn>
                            <TableHeaderColumn>Rozegranych gier</TableHeaderColumn>
                            <TableHeaderColumn>Ilość pkt na grę</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {
                            this.props.bestPlayers.map( (user, index) => this.renderUserRow(user, index + 1) )
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const styles = {
    header: {
        textAlign: 'center',
        marginTop: '5rem'
    }
}

function mapStateToProps(state){
    return {
        bestPlayers: state.bestPlayers
    }
}

export default connect(mapStateToProps, actions)(TopPlayers)