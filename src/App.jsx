import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (

      <div>
        <div className="header">
          <h3>KeyVault :</h3>
          <h4>&nbsp;Secure your passwords</h4>
        </div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </div>
          
  )
}

export default App
