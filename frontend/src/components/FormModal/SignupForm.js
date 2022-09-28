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
    const [image, setImage] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});
    const [pwdError, setPwdError] = useState(false);


    if(sessionUser) return <Redirect to="/" />

    // const initErrorObj = {
    //   username:'',
    //   email:'',
    //   password:'',
    //   firstName:'',
    //   lastName:'',
    //   confirmPassword:''
    // }

  const updateFile = e => {
    const img = e.target.files[0];
    if(img) setImage(img);
  }

    const handleSubmit = async e => {
        e.preventDefault();
        if(password !== confirmPassword){
            setErrors(["password is not equal to confirm password"]);
            setErrorsObj({});
            return setPwdError(true);
        }else{
            return dispatch(sessionActions.signupAction({firstName, lastName, email, username, password, image}))
                .then(() => {
                  setPwdError(false);
                  setErrors([]);
                  setErrorsObj({});
                  setUsername("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setFirstName("");
                  setLastName("");
                  setImage(null);
                })
                .catch(async (res) => {
                  console.log(res)
                  const data = await res.json();
                  if(data && data.errors) {
                      setErrorsObj(data.errors[0].errors);
                      setErrors(Object.values(data.errors[0].errors));
                  }
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
            className={errorsObj.email?'error':''}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={errorsObj.username?'error':''}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={errorsObj.firstName?'error':''}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={errorsObj.name?'lastName':''}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errorsObj.password || pwdError?'error':''}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={pwdError?'error':''}
          />
        </label>


      </div>
      <label htmlFor="image_uploads" className="label-img-upload">Upload your avanter (like png or jpg)
        <input
          type="file"
          placeholder="Upload avantar(like png or jpg)"
          id="image_uploads"
          name="image_uploads"
          accept="Image/*"
          onChange={updateFile}
        /></label>
      <button type="submit">Sign Up</button>
    </form>
    );
}

export default SignupForm;
