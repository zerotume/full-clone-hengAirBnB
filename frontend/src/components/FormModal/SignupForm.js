import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import * as sessionActions from "../../store/session";


function SignupForm() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to="/" />

    const handleSubmit = e => {
        e.preventDefault();

        console.log({firstName, lastName, email, username, password});

        if(password !== confirmPassword){
            return setErrors(["password is not equal to confirm password"]);
        }else{
            setErrors([]);
            return dispatch(sessionActions.signupAction({firstName, lastName, email, username, password}))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data);
                    if(data && data.errors) setErrors(Object.values(data.errors[0].errors));
                });
        }
    }

    return(
        <form className="user-form session-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='user-form-input-holder'>

        <label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    );
}

export default SignupForm;
