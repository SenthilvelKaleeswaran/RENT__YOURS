import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login and SignUp/Login';
import SignUp from './Components/Login and SignUp/SignUp';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Bits from './Components/Bits/Bits';
import Admin from './Components/Admin/Admin';
import BitsAcquired from './Components/Admin/Bits Acquired/BitsAcquired';
import Rented from './Components/Admin/Rented/Rented';
import AdminProducts from './Components/Admin/Products/AdminProducts';
import ProductsLoader  from './Components/Context/Context';
import WishList from './Components/User/WishList';

function App() {
  console.log(localStorage)

  return (
    <div>

          <BrowserRouter>
          <ProductsLoader>

                <NavBar/>


                <Routes>
                  
                      <Route path="" element={<Home/>}/>
                      <Route path="products" element={<Products/>}/>
                      <Route path="wishlist" element={<WishList/>}/>

                      <Route path="signUp" element={<SignUp/>}/>
                      <Route path="login" element={<Login/>}/>

                      <Route path="bits" element={<Bits/>}/>
                      <Route path="admin" element={<Admin/>}>
                        <Route index element={<AdminProducts/>}/>
                        <Route path="products" element={<AdminProducts/>}/>
                        <Route path="bitsAcquired" element={<BitsAcquired/>}/>
                        <Route path="rented" element={<Rented/>}/>
                      </Route>

                </Routes>
                
          </ProductsLoader>
          </BrowserRouter>

      
      
    </div>
  )
}

export default App