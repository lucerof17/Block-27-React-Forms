import { useState } from 'react'
import './App.css'

import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

function App() {

  return (
    <div>
      <h1>Welcome to My App</h1>
      <SignUpForm />
      <Authenticate />
    </div>
  )
}

export default App
