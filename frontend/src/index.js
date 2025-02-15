import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product.js';
import Blog from './Pages/Blog';
import About from './Pages/About';
import Login from './Pages/Login';
import Updateuserprofile from './Pages/Updateuserprofile.js'
import Userprofile from './Pages/Userprofile';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart.js'
import { store, persistor } from './redux/index.js';
import { Provider } from "react-redux";
import Newproduct from './Pages/Newproduct.js';
import ProtectedRoute from './Components/ProtectedRoute.js';
import Newspage from './Pages/Newspage.js';
import Success from './Pages/Success.js';
import Canceled from './Pages/Canceled.js';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='Home' element={<Home/>}></Route>
      <Route path='/home/Product/:FilterBy' element={<Product/>}></Route>
      <Route path='Blog' element={<Blog/>}></Route>
      <Route path='About' element={<About/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
      <Route path='Userprofile' element={<ProtectedRoute> <Userprofile/> </ProtectedRoute>}></Route>
      <Route path='Updateuserprofile' element={<Updateuserprofile/>}></Route>
      <Route path='Signup' element={<Signup/>}></Route>
      <Route path='Newproduct' element={<Newproduct/>}></Route>
      <Route path='Cart' element={<Cart/>}></Route>
      <Route path='Newspage' element={<Newspage/>}></Route>
      <Route path='Success' element={<Success/>}></Route>
      <Route path='Cancel' element={<Canceled/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
    </PersistGate>
  </Provider>
);

reportWebVitals();
