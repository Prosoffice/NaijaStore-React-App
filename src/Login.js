import React from 'react'
import "./Login.css"
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [grant_type, setGrantType] = useState(("password"))
    const [error, setError] = useState(null);

    const signIn = e => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        console.log(JSON.stringify({ username, password }))
        // send a POST request to the server to log the user in
        fetch('http://localhost/api/v1/login/access-token', {
          method: 'POST',
          body: params
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.detail) {
                console.log(data)
              alert(data.detail)
            } else {
                localStorage.setItem("user", JSON.stringify(data.access_token));
                history.push('/')
            }
          })
          .catch((error) => {
            setError(error.message);
          });
    }

    const register = e => {
        e.preventDefault();

        // Fancy firebase register
    }

    return (
        <div className="login">
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://i.ibb.co/4VgyYFJ/Naija-Store-logos.jpg'
                    alt='' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={username} onChange = {e => setUsername(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange = {e => setPassword(e.target.value)}/>

                    <button onClick={signIn} type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the NaijaStore terms of service.
                </p>

                <button onClick={register} type='submit' className='login__signInButton'><strong>Create your NaijaStore Account</strong></button>
            </div>
        </div>
    )

}

export default Login
