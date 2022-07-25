import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import HeaderBar from "./components/HeaderBar";
import LoginFormPage from "./components/FormModal";
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
      <HeaderBar />
      <Navigation sessionLoaded={sessionLoaded}/>
      <Switch>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/signup">
          <SignupFormPage />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
