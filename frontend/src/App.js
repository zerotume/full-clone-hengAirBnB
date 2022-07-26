import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import HeaderBar from "./components/HeaderBar";
import LoginFormPage from "./components/FormModal";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session';
import * as spotActions from './store/spots';
import * as bookingActions from './store/booking';
import SpotsList from "./components/SpotsList";
import SpotsDetailShow from "./components/SpotsDetailShow";
import MySpots from "./components/SpotsList/MySpots";
import CreateSpotForm from "./components/SpotsUpdate/CreateSpotForm";
import EditSpotForm from "./components/SpotsUpdate/EditSpotFrom";

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


      <Switch>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route exact path='/'>
          {spotsLoaded && <SpotsList sessionLoaded={sessionLoaded}/>}
        </Route>
        <Route exact path='/spots/myspots'>
          {spotsLoaded && <MySpots sessionLoaded={sessionLoaded}/>}
        </Route>
        <Route exact path='/spots/newspot'>
          {spotsLoaded && <CreateSpotForm sessionLoaded={sessionLoaded}/>}
        </Route>
        <Route path='/spots/:id/edit'>
          {spotsLoaded && <EditSpotForm sessionLoaded={sessionLoaded}/>}
        </Route>
        <Route path='/spots/:id'>
          {spotsLoaded && <SpotsDetailShow sessionLoaded={sessionLoaded}/>}
        </Route>
        <Route exact path='/spots'>
          {spotsLoaded && <SpotsList sessionLoaded={sessionLoaded}/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
