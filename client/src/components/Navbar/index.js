import React, { useState } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import axios from 'axios';
import { connect } from 'react-redux'

function Navbar({logout}) {

    const [state, setState] = useState({
        collapse: false,
    })
    const onClick = () => {
        setState({
            collapse: !state.collapse,
        });
    }
    const handleLogout = e => {
      e.preventDefault()
      axios.post('/api/auth/logout')
      logout()
    }
    const bgPink = {backgroundColor: '#191970'}
    return (
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
              <MDBIcon icon="university" />
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ onClick } />
              <MDBCollapse isOpen = { state.collapse } navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                      <MDBNavLink to="/">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink to="/createBidItem">Publish a Offer</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to="#" onClick={handleLogout}><MDBIcon icon="sign-out-alt" /></MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
    )
}

const mapDispatchToProps = dispatch => {
  return {
      logout : () => dispatch({
          type : "SET_LOGOUT"
      })
  }
}

export default connect(null, mapDispatchToProps)(Navbar);
