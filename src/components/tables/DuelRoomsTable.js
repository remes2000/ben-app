import React from 'react'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

const renderRoom = (room, index, selected, handleJoinRoom) => {
    return(
        <TableRow key={index} selected={selected}>
            <TableRowColumn>{room.id}</TableRowColumn>
            <TableRowColumn>{room.name}</TableRowColumn>
            <TableRowColumn>{room.players.length + '/' + room.slots}</TableRowColumn>
            <TableRowColumn>{room.difficultyLevel}</TableRowColumn>
            <TableRowColumn>{room.numberOfLevels}</TableRowColumn>
            <TableRowColumn>
                <RaisedButton 
                    label="Dołącz" 
                    secondary
                    onClick={ () => {
                        handleJoinRoom(room.id)
                    }} 
                />
            </TableRowColumn>
        </TableRow>
    )
}

const DuelRoomsTable = (props) => {
    return(
        <Table onRowSelection={props.handleRowSelection}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                    <TableHeaderColumn>Nr</TableHeaderColumn>
                    <TableHeaderColumn>Nazwa</TableHeaderColumn>
                    <TableHeaderColumn>Ilość slotów</TableHeaderColumn>
                    <TableHeaderColumn>Poziom trudności</TableHeaderColumn>  
                    <TableHeaderColumn>Liczba poziomów</TableHeaderColumn>  
                    <TableHeaderColumn></TableHeaderColumn>                          
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {
                props.rooms.map( ( room, index ) => renderRoom( room, index, props.isRowSelected(room.id), props.handleJoinRoom))
            }
            </TableBody>
        </Table>
    )
}

export default DuelRoomsTable