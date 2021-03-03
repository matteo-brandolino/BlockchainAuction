import { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../form/Input';


const Register = () => {
    let history = useHistory();

    const [state, setState] = useState(
        {
            first_name:'',
            last_name:'', 
            email:'', 
            password:'', 
            errors:[]
        }
    )

    const handleForm = (e) => {
        e.preventDefault();
        const data = {first_name:state.first_name, last_name:state.last_name, email: state.email, password:state.password}
        axios.post("/api/auth/register", data)
        .then(() => {
            history.push('/')
        })
        .catch(e => {
            setState({...state, errors : e.response.data.email})             
        })
    }
    console.log(state.errors);
    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setState({...state,[name]:value})
    }

    useEffect(() => {
        state.errors.map(error => 
            toast.error(error, {
                position: "top-right",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        )
    }, [state.errors])
    return (
        <MDBContainer className="d-flex justify-content-center align-items-center login-container">
        <MDBRow>
            <MDBCol md="12">
            <MDBCard className="card-body_auth">
                <MDBCardBody>
                <form  onSubmit={handleForm}>
                    <p className="h4 text-center py-4">Sign up</p>
                    <ToastContainer />
                    <div className="grey-text">
                        <Input label="Your First Name" type="text" name="first_name" handleInput={handleInput} />
                        <Input label="Your Last Name" type="text" name="last_name" handleInput={handleInput} />
                        <Input label="Your Email" type="email" name="email" handleInput={handleInput} />
                        <Input label="Your Password" type="password" name="password" handleInput={handleInput} />
                    </div>
                    <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-grey" type="submit">
                        Sign Up
                    </MDBBtn>
                    </div>
                    <p className="text-center">
                        <Link className="link-auth" to="/login">Already an account? Click here</Link>
                    </p>
                </form>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
  );
};

export default Register;

