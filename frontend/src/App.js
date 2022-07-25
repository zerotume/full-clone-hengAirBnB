import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import HeaderBar from "./components/HeaderBar";
import LoginFormPage from "./components/FormModal";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import SpotsList from "./components/SpotsList";
import SpotsDetailShow from "./components/SpotsDetailShow";

function App() {
  const dispatch = useDispatch();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [spotsLoaded, setSpotLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSession())
                .then(() => setSessionLoaded(true));
    dispatch(spotActions.readAllSpotsAction())
                .then(() => setSpotLoaded(true));
  },[dispatch])

  return (
    <div>
      <HeaderBar sessionLoaded={sessionLoaded}/>

      <Switch>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route exact path='/'>
          {spotsLoaded && <SpotsList />}
        </Route>
        <Route path='/spots/:id'>
          {spotsLoaded && <SpotsDetailShow />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
