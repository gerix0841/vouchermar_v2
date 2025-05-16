import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListVouchers from './components/ListVouchers'
import Footer from './components/Footer'
import Header from './components/Header'
import Voucher from './components/Voucher'
import Redeem from './components/Redeem'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<ListVouchers />}></Route>
          <Route path='/vouchers' element={<ListVouchers />}></Route>
          <Route path='/add-voucher' element={<Voucher />}></Route>
          <Route path='/edit-voucher/:id' element={<Voucher />}></Route>
          <Route path='/redeem' element={<Redeem />}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
