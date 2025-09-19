import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';

const Carousel = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const slidesRef = collection(db, 'slides');
                const slidesSnapshot = await getDocs(slidesRef);
                const slidesData = slidesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSlides(slidesData);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        };

        fetchSlides();
    }, []);

    const SamplePrevArrow=(props)=>{
        const {className,style,onClick}=props;
        return(
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
                <AiOutlineArrowLeft 
                    className='arrows hover:bg-red-600 transition-colors' 
                    style={{
                        ...style,
                        display:'block',
                        borderRadius:'50px', 
                        background:"#f53347", 
                        color:"white", 
                        position:"absolute", 
                        padding:"2px",
                        left:"50px"
                    }}
                />
            </div>
        )
    }

    const SampleNextArrow=(props)=>{
        const {className,style,onClick}=props;
        return(
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight 
                    className='arrows hover:bg-red-600 transition-colors' 
                    style={{
                        ...style,
                        display:'block',
                        borderRadius:'50px', 
                        background:"#f53347", 
                        color:"white", 
                        position:"absolute", 
                        padding:"2px",
                        right:"50px"
                    }}
                />
            </div>
        )
    }
    var settings = {
        dots: false,
        autoplay:true,
        autoplaySpeed:2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        nextArrow:<SampleNextArrow to="next"/>,
        prevArrow:<SamplePrevArrow to="prev"/>
    };
    return (
        <div>
            <div className="p-[15px]">
                <Slider {...settings}>
                {
                    slides?.map((slide) => {
                        return <div key={slide.id}>
                            <div className='px-[15px]'>
                                <img 
                                    src={slide.imageUrl} 
                                    alt="slide" 
                                    className='w-full h-[450px] object-cover rounded-xl'
                                />
                            </div>
                        </div>
                    })
                }
                </Slider>
            </div>
            <div className="mt-2">
                <Category />
            </div>
        </div>
    )
}

export default Carousel