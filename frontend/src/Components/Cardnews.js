import React from 'react'
import '../Pages/Newspage.js'

const Cardnews = ({ data }) => {

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div className='cardContainer'>
            {data.map((curItem, index) => {
                if(!curItem.urlToImage){
                    return null
                }
                else{
                return (
                    <div className='card' key={index}>
                        <img src={curItem.urlToImage}/>
                        <div className='content'>
                            <a className='title' onClick={()=>window.open(curItem.url)}>{curItem.title}</a>
                            <p className='mt-2'>{curItem.description}</p>
                            <button className='mt-3' onClick={()=>window.open(curItem.url)}>Read More</button>
                        </div>
                    </div>
                )
            }
        })}
        </div>
    );
};


export default Cardnews