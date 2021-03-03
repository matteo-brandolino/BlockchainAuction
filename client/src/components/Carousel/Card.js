import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import moment from 'moment';
import axios from 'axios'
import Websocket from "react-websocket"
import Form from './Form';
import update from 'react-addons-update';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card( { user, id, title, content, imgUrl, author, date, soldAt,finalPrice, pending, setPending }) {
    const [state, setState] = useState({
        minutes: 0,
        seconds: 20,
    })
    const { seconds, minutes } = state
    const [actualPrice, setActualPrice] = useState([])
    const [hash, setHash] = useState()
    useEffect(() => {
        const myInterval = setInterval(() => {

            if (seconds > 0) {
                setState({
                    minutes,
                    seconds: seconds - 1
                })
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setPending(true)
                    !soldAt && axios.post(`/api/bidItems/update/${id}`, {actualPrice: actualPrice[id-1]})
                        .then((res)=> setHash(res.data.hash))
                        .then(()=> setPending(false))
                } else {
                    setState({
                        minutes: minutes - 1,
                        seconds: 59
                    })
                }
            } 
        }, 1000)
        return () => {
            clearInterval(myInterval)
        }
    }, [id, minutes, seconds, soldAt, pending, setPending, actualPrice])
    useEffect(() => {
        hash && toast.success(`Check out your transation at https://ropsten.etherscan.io/tx/${hash}`, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })  
    }, [hash])
    return (
        <MDBCard style={{ width: "22rem", marginBottom:"30px" }}>
            <ToastContainer 
                style={{width:"60em"}} 
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
            <Websocket
                url="ws://localhost:8000/ws/notifications"
                onMessage={(event) => {
                    const eventFromSocket = JSON.parse(event)
                    eventFromSocket.data.bidItem === id && setActualPrice(update(actualPrice, {
                        [id-1]: {
                            $set: eventFromSocket.data.price
                        }
                    }));
                }}
            />
            <Websocket
                url={`ws://localhost:8000/ws/actual_price`}
                onMessage={(event) => {
                    const new_actualPrice = JSON.parse(event)
                    setActualPrice([new_actualPrice, ...actualPrice])
                }}
       
            />
            <MDBCardImage className="img-fluid" style={{height:"200px", width:"100%"}} src={imgUrl} waves />
            <MDBCardBody>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {content} <br/> {!soldAt ? `Actual Price: ${actualPrice[id - 1] || 0}` : `Final Price: ${finalPrice}`}
                </MDBCardText>
                <MDBCardBody className="card-body_card">
                    {
                        !soldAt && 
                        <Form 
                            user_id={user.id} 
                            bidItem={id} 
                            actualPrice={actualPrice[id -1]} 
                            setPending={setPending} 
                        />
                    }
                </MDBCardBody>
                <MDBCardText className="mt-2">
                    Offered by {author} - {moment(date).format('HH/MM/YYYY')}
                </MDBCardText>
                {
                    soldAt ?                     
                    <MDBCardText >
                        {"Sold at " + moment(soldAt).format('HH/MM/YYYY')}
                    </MDBCardText>
                    :
                    <MDBCardText >
                        {minutes} {seconds}
                    </MDBCardText>
                }
            </MDBCardBody>
    </MDBCard>
    )
}

const mapStateToProps = state => {
    return {
        user:state.auth.user,
    }
}

export default connect(mapStateToProps)(Card);
