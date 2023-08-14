import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { AuthContextProvider } from "./contexts/AuthContext"
import MyKittensPage from "./pages/RegisterCat/CatRegisterPage"
import MyCart from "./pages/CartPage/MyCartPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/Home/HomePage"
import KittenDetails from "./pages/KittenDetails/KittenDetails"
import CheckoutPage from "./pages/CheckoutPage"
import { CartContextProvider } from "./contexts/CartContext"
import AddKittenPage from "./pages/RegisterCat/CatPage"
import UpdateKittenPage from "./pages/RegisterCat/UpdateKittenPage"
import OrderSuccessPage from "./pages/OrderSuccessPage"


export default function App() {

  return (
    <AuthContextProvider>
      <CartContextProvider>
        {/*<PagesContainer>*/}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/kitten/:id" element={<KittenDetails />}/>
            <Route path="/my-kittens" element={<MyKittensPage />} /> 
            <Route path="/add-kitten" element={<AddKittenPage />} />
            <Route path="/kitten/:id/update" element={<UpdateKittenPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/cart" element={<MyCart />} />
            <Route path='/checkout' element={<CheckoutPage />} />


          </Routes>
        </BrowserRouter>
        {/*</PagesContainer>*/}
      </CartContextProvider>
    </AuthContextProvider>
  )
}

const PagesContainer = styled.main`
  max-width: 100vw;
  max-height: 100vh;
`
