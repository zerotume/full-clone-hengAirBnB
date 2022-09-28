import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import * as sessionActions from "../../store/session";


function SignupFormPage() {

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

        if(password !== confirmPassword){
            return setErrors(["password is not equal to confirm password"]);
        }else{
            setErrors([]);
            return dispatch(sessionActions.signupAction({firstName, lastName, email, username, password}))
                .catch(async (res) => {
                    const data = await res.json();
                    if(data && data.errors) setErrors(data.errors);
                });
        }
    }

    return(
        <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label><br />
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label><br />
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label><br />
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label><br />
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label><br />
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label><br /><br />

      <label for="image_uploads">Upload your avantar (PNG, JPG)
        <input
          type="file"
          id="image_uploads"
          name="image_uploads"
          accept=".jpg, .jpeg, .png"
        /></label><br />

      <button type="submit">Sign Up</button>
    </form>
    );
}

export default SignupFormPage;
