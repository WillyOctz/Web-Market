import React, { useEffect, useState } from 'react'
import Cardnews from '../Components/Cardnews'
import '../Pages/CSS/news.css'
import '../App.js'

const Newspage = () => {

    const [search, setSearch] = useState("")
    const [Datanews, setNewsdata] = useState(null)
    const API_KEY = '8cc3e8fceeca47a8a52b3523098a0565' //needs to be changed according to user account in news api

    const getNews = async() => {
        let url;
        if (search) {
            // Fetch news based on the search term if it exists
            url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`;
        } else {
            // Fetch top headlines from around the world if no search term is provided and can change to any country in the country = ''
            url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`; 
        }
        
        const res = await fetch(url)
        const data = await res.json()
        let newsdisplay = data.articles.slice(0,15)
        setNewsdata(newsdisplay)
    }

    useEffect(() => {
        getNews()
    },[])

    const Inputhandle = async(e) => {
        console.log(e.target.value)
        setSearch(e.target.value)

    }

    const userinput = (e) => {
        const topic = e.target.value
        setSearch(topic)
        getNews()
    }

    return (
        <div className='-mt-7'>
            <nav>
                <div>
                    {/*<h1 className='head'>Breaking News!</h1>*/}
                </div>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={Inputhandle}/>
                    <button className='hover:bg-blue-400' onClick={getNews}>Search</button>
                </div>
            </nav>

            <div className='categoryBtn mt-5'>
                <button className='hover:bg-green-500' onClick={userinput} value="health">Health</button>
                <button className='hover:bg-green-500' onClick={userinput} value="market">Market Price</button>
                <button className='hover:bg-green-500' onClick={userinput} value="stock">Stock Market</button>
            </div>

            <div className=''>
                {Datanews? <Cardnews data={Datanews}/> : null}
            </div>
        </div>
    );    
}

export default Newspage