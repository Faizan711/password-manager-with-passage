import React from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'

function Home() {

    const {isLoading, isAuthorized, username} = useCurrentUser();

    if (isLoading) {
        return null;
    }
    const authorizedBody = 
    <>
        You successfully signed in with Passage.
        <br/><br/>
        Your username is: <b>{username}</b>
    </>

    const unauthorizedBody = 
    <>
        You have not logged in and cannot view the dashboard.
        <br/><br/>
        <a href="/" >Login to continue.</a>
    </>

  return (
    <div>
            <div>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
            <div>
                { isAuthorized ? authorizedBody : unauthorizedBody }
            </div>
        </div>
  )
}

export default Home