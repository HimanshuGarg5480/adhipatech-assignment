import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Home from './pages/Home.jsx'
import CartPage from './pages/CartPage.jsx'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
