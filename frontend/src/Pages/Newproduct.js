import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import '../globals.css';
import { ImagetoBase64 } from '../utility/ImagetoBase64.js';
import { toast } from 'react-hot-toast';

const Newproduct = () => {
    
    const [data,setData] = useState({
        name : "",
        categories : "",
        image : "",
        prices : "",
        description : ""
    })

    const handleOnChange = (e) => {
        const {name,value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const uploadImage = async(e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            
            console.error("No file selected");
            
            return;
        }
    
        try {
            const data = await ImagetoBase64(files[0]);
            setData((prev) => ({
                ...prev,
                image: data,
            }));
        } catch (error) {
            console.error("Error converting images!", error);
        }
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        console.log(data)

        const {name,image,categories,prices} = data

        if (name && image && categories && prices) {
            
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProducts`,{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            });
    
            const fetchRes = await fetchData.json()
            console.log(fetchRes)
            toast(fetchRes.message)

            //this section is to made all the inputs blank when uploaded to database
            setData(() => {
                return {
                    name : "",
                    categories : "",
                    image : "",
                    prices : "",
                    description : ""
                }
            })
        }

        else {
            toast("Fields with * must be filled!")
        }
    }
    
    return (
        <div className='mt-16'>
            <form className='text-center shadow m-auto max-w-md p-3 flex flex-col bg-gradient-to-b from-[rgba(247,250,250,0.99)] to-[rgba(140,227,189,1)] rounded' onSubmit={handleOnSubmit}>
                <label htmlFor='name' className=''>Name :<span className='text-red-500'> *</span></label>
                <input type={"text"} name='name' className='bg-slate-300 p-1' onChange={handleOnChange} value={data.name}></input>

                <label htmlFor='categories' className='mt-1'>Categories :<span className='text-red-500'> *</span></label>
                <select className='mt-1 p-1' id='categories' onChange={handleOnChange} name="categories" value={data.categories}>
                    <option value={"other"}>-Select Category-</option> 
                    <option value={"fruits"}>Fruits</option>
                    <option value={"vegetable"}>Vegetable</option>
                    <option value={"ice cream"}>Ice Cream</option>
                    <option value={"caffeine"}>Caffeine</option>
                    <option value={"poison"}>Poison</option>
                    <option value={"meat"}>Meat</option>
                </select>
                <label htmlFor='image' className='mt-1'>Images :<span className='text-red-500'> *</span>
                <div className="w-full bg-slate-300 h-40 my-2 rounded w-full shadow justify-center flex items-center cursor-pointer">
                    {
                        data.image ? <img src={data.image} className="h-full"></img> : <span className='text-4xl'><IoCloudUploadOutline/></span> 
                    }
                    <input id="image" type={"file"} accept="image/*" name="image" onChange={uploadImage} className='hidden'></input>
                </div>
                </label>
                

                <label htmlFor='prices'>Price :<span className='text-red-500'> *</span></label>
                <input type={"text"} name="prices" className='bg-slate-300 p-1 mt-1' onChange={handleOnChange} value={data.prices}></input>

                <label htmlFor='description' className='p-1 mt-1'>Description :</label>
                <textarea rows={3} className='bg-slate-300 mt-1 resize-none' name="description" onChange={handleOnChange} value={data.description}></textarea>

                <button className='mt-6 button-41'>Submit</button>
            </form>
        </div>
    );    
}

export default Newproduct