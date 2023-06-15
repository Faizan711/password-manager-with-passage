import React from 'react'
import '@passageidentity/passage-elements/passage-auth'

function Login() {

    const apiKey = import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID;

  return (
    <passage-auth app-id={apiKey}></passage-auth>
  )
}

export default Login