import React from 'react';
import Carousel from '../Carousel';
import Navbar from '../Navbar';
import { MDBContainer } from 'mdbreact';
import { connect } from 'react-redux'
import SoldItemList from '../SoldItemList';

function Dashboard( { user }) {
    const container = {height: 1300}
    
    return(
      <div>
        <Navbar />
        <MDBContainer style={container} className="text-center mt-5 pt-5">
          <h1 className="text-center black-text mb-4">Welcome, {user.first_name} {user.last_name}</h1>
            <Carousel />
            <SoldItemList />
        </MDBContainer>
      </div>
    );
  }

const mapStateToProps = state => {
    return {
        user:state.auth.user,
    }
}
export default connect(mapStateToProps)(Dashboard)
