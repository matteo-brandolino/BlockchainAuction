import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../Carousel/Card';

function SoldItemList() {
    const [pending, setPending] = useState(false)
    const [bidItems, setBidItems] = useState()

    useEffect(() => {
        axios.get("/api/bidItems/all_sold", {withCredentials: true})
            .then(res => {
                setBidItems(res.data)
            })
            .catch(e => {
                console.log(e)          
            })
    }, [pending])
    return (
        <>
        <h1 className="text-center black-text">Sold Items</h1>
        <div className="d-flex flex-wrap justify-content-around align-items-around">
            {
                bidItems && bidItems.map((bidItem, idx) => (
                        <Card
                            key={idx}
                            pending={pending}
                            setPending={setPending}
                            id={bidItem.id} 
                            title={bidItem.title} 
                            content={bidItem.content} 
                            imgUrl={bidItem.imgUrl} 
                            author={bidItem.user} 
                            date={bidItem.createdAt}
                            soldAt={bidItem.soldAt}
                            finalPrice={bidItem.finalPrice || ''}
                        />
                ))
            }
        </div>
        </>
    )
}

export default SoldItemList
