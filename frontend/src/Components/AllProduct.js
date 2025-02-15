import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import CardFeature from '../Components/CardFeature.js';
import FilterProduct from '../Components/FilterProduct.js';
import loading from '../Pages/Home.js'

const AllProduct = ({heading}) => {
    const productData = useSelector((state) => state.products.productList)

    const categoryList = [...new Set(productData.map(el=>el?.categories).filter(category => category != null))]

    const [FilterBy,setFilterBy] = useState('')
    const [DataFilter,setDataFilter] = useState([])
    
    useEffect(() => {
        if (productData) {
            setDataFilter(productData);
        }
    }, [productData]);

    const FilterhandleProduct = (categories) => {
        
        if (!categories || typeof categories !== 'string') return; // Check if categories is undefined and a string
        
        setFilterBy(categories);

        const filter = productData.filter(el => 
            {return el?.categories && el.categories.toLowerCase() === categories.toLowerCase()}
        );
        
        setDataFilter(filter)
    }

    return (
        <div className=''>
        <h2 className='font-bold text-3xl mt-7 ml-2'>
            {heading}
        </h2>

        <div className='flex gap-2 justify-center overflow-scroll scrollbar-none'>
            {
                categoryList[0] ? ( categoryList.map(el => {
                    if (!el) return null;
                    return (
                        <FilterProduct 
                        categories={el} 
                        key={el}
                        isActive={el.toLowerCase() === FilterBy.toLowerCase()} 
                        onClick={() => FilterhandleProduct(el)}/>
                    )
                })
             ) : (
                <div className='min-w-[240px]'>
                <p>{loading}</p>
             </div>  
            )}
        </div>

        <div className='flex flex-wrap justify-center gap-4 my-3'>
            {
                DataFilter.map(el => {
                    return (
                        <CardFeature
                        key={el._id}
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
    );    
}

export default AllProduct