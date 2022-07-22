import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSession())
                .then(() => setSessionLoaded(true));
  },[dispatch])

  return (
    <div>
      <h1>Hello from App</h1>
      <Navigation sessionLoaded={sessionLoaded}/>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
