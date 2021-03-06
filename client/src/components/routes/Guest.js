import {Route,Redirect} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const GuestRoute = ({ component: Component, ...rest }) => {
    return (
    <Route
        {...rest}
        render={ props =>
        !rest.loggedIn ? ( //not availible 
            <Component {...props} />
        ) : (
            <Redirect
            to={{
                pathname: "/",
                state: { from: props.location }
            }}
            />
        )
        }
    />
    );
}

const mapStateToProps = state => {
    return {
        loggedIn:state.auth.loggedIn
    }}

export default connect(mapStateToProps)(GuestRoute);