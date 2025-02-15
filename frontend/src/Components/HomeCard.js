import React from 'react'

const HomeCard = ({name,image,prices,categories}) => {
    return (
        <div className=''>
            <div className='min-w-[240px] max-w-[220px]'>
                <img src={image} alt={name} className="w-[240px] h-[220px]" />
            </div>
        </div>
    );    
}

export default HomeCard