import logo from './logo.svg';
import './App.css';
import './index.css';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataproduct } from './redux/productSlide.js';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.products)

  useEffect(() => {
    ( async() => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products`);
        if (!res.ok) throw new Error("Failed to fetch products data");
        const resData = await res.json();
        //console.log(resData)
        dispatch(setDataproduct(resData));
      } catch (error) {
        console.error(error);
      }
    })()
  },[])
  //console.log(productData)
  return (
    <>
      <Toaster />
      <div className="">
        <Header/>
        <div className='pt-16 bg-gradient-to-b from-[rgba(247,250,250,0.99)] to-[rgba(140,227,189,1)] min-h-[calc(100vh)]'>
          <Outlet/>
        </div>
      </div>   
    </>
  );
}

export default App;
