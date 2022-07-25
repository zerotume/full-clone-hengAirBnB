import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotLoggedButton from "./NotLoggedButton";
import ProfileButton from "./ProfileButton";




function Navigation({sessionLoaded}){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (<ProfileButton user={sessionUser} />);
    }else{
        sessionLinks = (<NotLoggedButton />);
    }

    return (
                <div>
                    {sessionLoaded && sessionLinks}
                </div>
    );
}

export default Navigation;
