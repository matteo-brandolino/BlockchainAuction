import React, { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss'
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Card from './Card';
import axios from 'axios'
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Carousel() {
    const [bidItems, setBidItems] = useState()
    const [pending, setPending] = useState(false)

    useEffect(() => {
        axios.get("/api/bidItems/all", {withCredentials: true})
            .then(res => {
                setBidItems(res.data)
            })
            .catch(e => {
                console.log(e)          
            })
    }, [pending])
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            navigation
            className="swiper-custom-container"
        >
            {
                bidItems && bidItems.map((bidItem, idx) => (
                    <SwiperSlide key={idx}>  
                        <Card
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
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Carousel
