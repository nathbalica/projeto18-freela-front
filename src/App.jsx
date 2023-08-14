import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { AuthContextProvider } from "./contexts/AuthContext"
// import ProductPage from "./pages/ProductPage"
import MyCart from "./pages/CartPage/MyCartPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/Home/HomePage"
import KittenDetails from "./pages/KittenDetails/KittenDetails"
// import CheckoutPage from "./pages/CheckoutPage"
import { CartContextProvider } from "./contexts/CartContext"

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
            {/* <Route path="/produto/:id" element={<ProductPage />} /> */}
            <Route path="/cart" element={<MyCart />} />
            {/* <Route path='/checkout' element={<CheckoutPage />} /> */}


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
