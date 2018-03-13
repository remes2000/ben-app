import React from 'react'
import _ from 'lodash'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuestRoute = ( {isUserInRoom, component: Component, ...rest} ) => {
    return (
        <Route {...rest} render={ props => 
            isUserInRoom ? (
                <Component {...props} />
            ) : (
                <Redirect to="/duel" />
            )
        } />
    )
}

function mapStateToProps(state) {
    return {
        isUserInRoom: !_.isEmpty(state.duelRoom)
    }
}

export default connect(mapStateToProps)(GuestRoute)