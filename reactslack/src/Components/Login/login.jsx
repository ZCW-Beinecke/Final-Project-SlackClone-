import React, { useState, useRef } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaPhoneSquare } from 'react-icons/fa';

const Login = () => {
  const [loginAction, setLoginAction] = useState('');
  const [registerAction, setRegisterAction] = useState('');
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);

  const registerLink = () => {
    setRegisterAction(' active');
    setLoginAction(' active');
  };

  const loginLink = () => {
    setLoginAction(' ');
    setRegisterAction(' ');
    //     var username = usernameRef.current.value;
    //     var password = passwordRef.current.value;

    console.log('Login clicked');
    //set the login credintials

    //fix the reqeust
    fetch('http://localhost:8080/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin', //usernameRef.current.value,
        password: 'admin', //passwordRef.current.value
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        window.location.href = '/thinair';
      })
      .catch(error => {
        console.error('login problem', error);
        alert('Still wrong');
      });
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    var username = usernameRef.current.value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log('Registration submitted');
    // Handle registration form submission
    // ...
  };

  return (
    <div className={`wrapper${loginAction}`}>
      <div className="form-box login">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required ref={usernameRef} />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required ref={passwordRef} />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/home">Forgot password?</a>
          </div>

          <button type="button" onClick={loginLink}>
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className={`form-box register${registerAction}`}>
        <form onSubmit={handleRegisterSubmit}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required ref={usernameRef} />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required id="email" />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Phone-Number" required />
            <FaPhoneSquare className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />I agree to the terms & conditions
            </label>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
