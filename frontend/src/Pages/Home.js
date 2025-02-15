import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../Components/HomeCard.js'
import { useSelector } from 'react-redux'
import CardFeature from '../Components/CardFeature.js'
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"
import { MdOutlineFilterAlt } from "react-icons/md";
import FilterProduct from '../Components/FilterProduct.js'
import AllProduct from '../Components/AllProduct.js'
import markets1 from '../assets/images/fruits-veggies.jpg'
import markets2 from '../assets/images/fruits-veggies2.jpg'
import markets3 from '../assets/images/fruits-veggies3.jpg'
import '../Pages/CSS/homeslide.css'

const Home = () => {
    
    const productData = useSelector((state) => state.products.productList)
    
    const homeProductCartList = productData.slice(0,6)
    const homeProductShowAll = productData
    
    const loadingArray = new Array(4).fill(null)
    const loadingArrayfeature = new Array(2).fill(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const sliderProductRef = useRef()
    const [isScrolling, setisScrolling] = useState(false)

    const images = [markets1, markets2]; // Add more images as needed

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
    
    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const nextProductSlide = () => {
        
        if (!isScrolling) {
            setisScrolling(true)
            sliderProductRef.current.scrollLeft += 200
            setTimeout(() => setisScrolling(false), 1000)
        }
        
    }
    const previousProductSlide = () => {
        
        if (!isScrolling) {
            setisScrolling(true)
            sliderProductRef.current.scrollLeft -= 200
            setTimeout(() => setisScrolling(false), 1000)
        }
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage()
        }, 3000)
        return () => clearInterval(interval)
    }, [currentImageIndex])

    const duplicatedCards = [...homeProductShowAll, ...homeProductShowAll]

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            if (sliderProductRef.current) {
                const {scrollLeft, scrollWidth, clientWidth} = sliderProductRef.current
                const maxScrollLeft = scrollWidth - clientWidth

                if (scrollLeft >= maxScrollLeft) {
                    sliderProductRef.current.scrollLeft = 0
                }
                else {
                    sliderProductRef.current.scrollLeft += 200
                }
            }
        }, 3000)
        return () => clearInterval(autoScrollInterval)
    }, [])

    //displaying filtered data
    return (
        <div className='-mt-7'>
            <div className='md:flex py-3 flex-col items-center'>
                {/*this is image section */}
                <div className='w-full h-96 overflow-hidden relative -mt-12 hover:shadow-lg drop-shadow'>
                    <img 
                        src={images[currentImageIndex]} 
                        alt='' 
                        className='w-full h-full object-cover transform hover:scale-105'
                    />
                    <button 
                        onClick={previousImage} 
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r'
                    >
                        <GrPrevious/>
                    </button>
                    <button 
                        onClick={nextImage} 
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l'
                        >
                        <GrNext/>
                    </button>
                </div>
                {/* this is text section */}
                <div className='text-center mt-5'>
                    <h2 className='text-4xl md:text-7xl font-bold'>The Most Fresh</h2>
                    <span className='text-4xl md:text-7xl font-bold'>Products Amongst The</span>
                    <span className='text-green-600 text-4xl md:text-7xl font-bold flex justify-center mt-3'>Freshest</span>
                    <p style={{ width: '100%', maxWidth: '1000px' }} className='py-4 mt-3 text-base max-w-lg mx-auto'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
                {/* previews of all product */}
                <div className=''>
                    <div className='flex w-full items-center'>
                        <h2 className='font-bold text-3xl mt-7 ml-2'>
                            Previews
                        </h2>
                        <div className='ml-auto flex gap-3'>
                            <button onClick={previousProductSlide} className='hover:bg-slate-500'><GrPrevious/></button>
                            <button onClick={nextProductSlide} className='hover:bg-slate-500'><GrNext/></button>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={sliderProductRef}>
                        {
                            duplicatedCards.map((el, index) => {
                            return (
                                <CardFeature
                                    key={index}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    prices={el.prices}
                                    categories={el.categories}
                                />
                                )                            
                            })
                        }
                    </div>
                </div>
                <AllProduct heading={"Products"}/>
        </div>
    );    
}

export default Home