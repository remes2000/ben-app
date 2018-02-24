import React from 'react'

import { Link } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'

const renderHighscore = (highscore, index) => {
    return(
        <TableRow key={index}>
            <TableRowColumn>{index + 1}</TableRowColumn>
            <TableRowColumn>
                <Link to={`/profile/${highscore.userId}`}>{highscore.username}</Link>
            </TableRowColumn>
            <TableRowColumn>{highscore.score}</TableRowColumn>
            <TableRowColumn>{highscore.difficultyLevel}</TableRowColumn>
        </TableRow>
    )
}

const HighscoresTable = (props) => {
    return(
        <Table>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                    <TableHeaderColumn>Miejsce</TableHeaderColumn>
                    <TableHeaderColumn>Gracz</TableHeaderColumn>
                    <TableHeaderColumn>Ilość punktów</TableHeaderColumn>
                    <TableHeaderColumn>Poziom trudności</TableHeaderColumn>                            
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {
                props.highscores.map( ( highscore, index ) => renderHighscore( highscore, index))
            }
            </TableBody>
        </Table>
    )
}

export default HighscoresTable