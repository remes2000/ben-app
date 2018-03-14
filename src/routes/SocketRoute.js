import React, { Component } from 'react'
import _ from 'lodash'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FETCH_IS_PENDING } from '../actions/types'

class SocketRoute extends Component{

    constructor(props){
        super(props)

        this.state={
            connected: false
        }
    }

    isSocketConnected(socket){
        return !_.isEmpty(socket) && socket.connected
    }

    render(){

        const { socket, isAuthenticated, isFetched, component: Component, ...rest } = this.props 
         

        return (
            <Route {...rest} render={ props => 
                this.isSocketConnected(socket)&&isAuthenticated ? (
                    <Component {...props} />
                ) : 
                isFetched? (
                    <div>Loading...</div>
                ):
                (
                    <Redirect to="/" />
                )
            } />
        )
    }
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        isAuthenticated: !_.isEmpty(state.user),
        isFetched: state.user===FETCH_IS_PENDING
    }
}

export default connect(mapStateToProps)(SocketRoute)