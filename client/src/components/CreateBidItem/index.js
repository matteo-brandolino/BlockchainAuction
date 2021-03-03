import { useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Navbar from '../Navbar'
import { useHistory } from "react-router-dom";

function CreateBidItem({ user }) {
    let history = useHistory();

    const [state, setState] = useState({
        user: '',
        title: '',
        content: '',
        imgUrl: ''
    })
    const handleForm = (e) => {
        e.preventDefault();
        const data = {user: user.id, title: state.title, content:state.content, imgUrl:state.imgUrl}
        axios.post("/api/bidItems/create", data, {withCredentials: true})
            .then(() => {
                history.push('/')
            })
            .catch(e => {
                console.log(e.response);            
            })
    }

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setState({...state,[name]:value})
    }
    return (
        <div>
            <Navbar />
            <MDBContainer className="d-flex justify-content-center align-items-center login-container">
        <MDBRow>
            <MDBCol md="12">
            <MDBCard className="card-body_auth">
                <MDBCardBody>
                <form onSubmit={handleForm}>
                    <p className="h4 text-center py-3">Publish an Offer</p>
                        <Input label="Title" type="text" name="title" handleInput={handleInput} />
                        <Textarea label="Description" type="text" name="content" handleInput={handleInput} />
                        <Input label="Img Url" type="text" name="imgUrl" handleInput={handleInput} />

                    <div className="text-center py-4 mt-3">
                        <MDBBtn className="btn btn-outline-grey" type="submit">
                            Publish
                        </MDBBtn>
                    </div>
                </form>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user:state.auth.user,
        
    }
}

export default connect(mapStateToProps)(CreateBidItem);
