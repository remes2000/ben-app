import React from 'react'
import _ from 'lodash'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FETCH_IS_PENDING } from '../actions/types'

const SocketRoute = ( { isSocketConnected, isAuthenticated, isFetched, component: Component, ...rest} ) => {
    return (
        <Route {...rest} render={ props => 
            isSocketConnected&&isAuthenticated ? (
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

function mapStateToProps(state) {
    return {
        isSocketConnected: !_.isEmpty(state.socket),
        isAuthenticated: !_.isEmpty(state.user),
        isFetched: state.user===FETCH_IS_PENDING
    }
}

export default connect(mapStateToProps)(SocketRoute)