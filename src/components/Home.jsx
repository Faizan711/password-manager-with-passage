import React, { useState, useEffect } from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import '../styles/home.css'

function Home() {

    const {isLoading, isAuthorized, username} = useCurrentUser();
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);

    const [passwords, setPasswords] = useState([]);
    const [appName, setAppName] = useState('');
    const [appPassword, setAppPassword] = useState('');

    const generatePassword = () => {
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
        let characters = '';
        if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;
    
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          generatedPassword += characters[randomIndex];
        }
    
        setPassword(generatedPassword);
      };

      useEffect(() => {
        // Fetch passwords from local storage when component mounts
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPasswords(storedPasswords);
      }, []);
    
      useEffect(() => {
        // Update local storage whenever passwords change
        localStorage.setItem('passwords', JSON.stringify(passwords));
      }, [passwords]);

      const addPassword = () => {
        if (appName && appPassword) {
          const newApp = { appName, appPassword };
        // const newApp = { appName: appName, appPassword: appPassword };
          setPasswords([...passwords, newApp]);
          setAppName('');
          setAppPassword('');
        }
      };

    if (isLoading) {
        return null;
    }
    const authorizedBody = 
    <>
        <div className='container'>
            <div className='welcome'>
                <p >Welcome {username},</p>
            </div>
            <div className='component'>
                <div className='generator'>
                    <h3 className='heading'>Generate Strong passwords!!</h3>
                    <div>
                        <label>Password Length: </label>
                        <input
                        type="number"
                        min="6"
                        max="20"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Include Lowercase: </label>
                        <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label>Include Uppercase: </label>
                        <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label>Include Numbers: </label>
                        <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label>Include Symbols: </label>
                        <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        />
                    </div>
                    <button onClick={generatePassword} className='btn'>Generate Password</button>
                    <p className='password'>{password}</p>

                </div>
                <div className='storage'>
                    <h3 className='heading'>Store your Passwords</h3>
                    <div>
                        <label className='label'>App Name: </label>
                        <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='label'>App Password: </label>
                        <input
                        type="password"
                        value={appPassword}
                        onChange={(e) => setAppPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={addPassword} className='btn'>ADD</button>
                    <h3 className='heading'>Stored Passwords:</h3>
                    {passwords.length > 0 ? (
                        <ul>
                        {passwords.map((app, index) => (
                            <li key={index}>
                            <strong>{app.appName}:</strong> {app.appPassword}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>No passwords stored.</p>
                    )}
                </div>
            </div>
        </div>
    </>

    const unauthorizedBody = 
    <>
        You have not logged in and cannot view the dashboard.
        <br/><br/>
        <a href="/" >Login to continue.</a>
    </>

  return (
    <div>
            {/* <div>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div> */}
            <div>
                { isAuthorized ? authorizedBody : unauthorizedBody }
            </div>
        </div>
  )
}

export default Home