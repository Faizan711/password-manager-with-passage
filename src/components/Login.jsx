import React from 'react'
import '@passageidentity/passage-elements/passage-auth'
import '../styles/login.css'

function Login() {

    const apiKey = import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID;

  return (
    <div className='container'>
      <passage-auth app-id={apiKey} ></passage-auth>
    </div>
  )
}

export default Login