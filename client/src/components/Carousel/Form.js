import React, { useState } from 'react'
import { MDBBtn } from 'mdbreact';
import Input from '../form/Input';
import axios from 'axios'

function Form( { user_id, bidItem, actualPrice, setPending}) {
    const [bid, setBid] = useState({
        price: 0
    })

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setBid({...bid,[name]:value})
    }
    const handleFormBid = (e) => {
        e.preventDefault();
        const data = {user: user_id, bidItem: bidItem, price: parseFloat(bid.price)}
        setPending(true)
        axios.post(`/api/bidItems/place_a_bid/${bidItem}`, data, {withCredentials: true})
            .then(()=> {
                setPending(false);
            })
            .catch(e => {
                console.log(e.response);            
            })
    }

    return (
        <form onSubmit={handleFormBid}>
            <Input label="Price" type="number" name="price" handleInput={handleInput} />
            <MDBBtn className="btn btn-outline-grey" type="submit" disabled={parseFloat(bid.price) <= parseFloat(actualPrice) && true}>
                Place a Bid
            </MDBBtn>
        </form>
    )
}

export default Form
