import { useState } from "react";
import LoginForm from "./LoginForm";
import Modal from "../../context/Modal";
import SignupForm from "./SignupForm";

function FormModal(){
  const [showLogin,setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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



  return (
    <div onClick={e => e.stopPropagation()}>
      <ul className="profile-dropdown">
          <li><button onClick={loginClick}>Log In</button></li>
          <li><button onClick={signupClick}>Sign up</button></li>
      </ul>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <button onClick={signupClick}>Change to Signup</button>
          <LoginForm />
        </Modal>
      )}
      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <button onClick={loginClick}>Change to Login</button>
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
