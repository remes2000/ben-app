import React from 'react'
import _ from 'lodash'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuestRoute = ( {isAuthenticated, component: Component, ...rest} ) => {
    return (
        <Route {...rest} render={ props => 
            !isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        } />
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !_.isEmpty(state.user)
    }
}

export default connect(mapStateToProps)(GuestRoute)