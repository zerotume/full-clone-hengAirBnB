import { useState } from "react";
import LoginForm from "./LoginForm";
import Modal from "../../context/Modal";
import SignupForm from "./SignupForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';

function FormModal(){
  const [showLogin,setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const loginClick = e => {
    e.preventDefault();
    e.stopPropagation()
    setShowLogin(true);
    setShowSignup(false);
  }

  const signupClick = e => {
    e.preventDefault();
    e.stopPropagation()
    setShowSignup(true);
    setShowLogin(false);
  }

  const demouserClick = e => {
    e.preventDefault()
    e.stopPropagation()
    return dispatch(sessionActions.loginAction({credential:"catuser1", password:"password1"}));
  }


  return (
    <div onClick={e => e.stopPropagation()}>
      <ul className="profile-dropdown">
          <li><button onClick={loginClick}>Log In</button></li>
          <li><button onClick={signupClick}>Sign up</button></li>
          <li><button onClick={demouserClick}>Demouser Login</button></li>
      </ul>
      {showLogin && (
        <Modal className="form-modal" onClose={() => setShowLogin(false)}>
          <p>Login</p>
          <div className="form-welcome"><h2>Welcome to Catbnb!</h2></div>
          <div className="change-form">
            <span>Not having an account?</span><button className="user-logsign-button" onClick={signupClick}>Change to Signup</button>
          </div>
          <LoginForm />
        </Modal>
      )}
      {showSignup && (
        <Modal className="form-modal" onClose={() => setShowSignup(false)}>
          <p>Signup</p>
          <div className="form-welcome"><h2>Welcome to Catbnb!</h2></div>
          <div className="change-form">
            <span>Already Registered?</span><button className="user-logsign-button" onClick={loginClick}>Change to Login</button>
          </div>
          <SignupForm />
        </Modal>
      )}
    </div>
  )
}

export default FormModal;
/*
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {credential, password}
    return dispatch(sessionActions.loginAction(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Credential: (Username or Email)
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
*/
