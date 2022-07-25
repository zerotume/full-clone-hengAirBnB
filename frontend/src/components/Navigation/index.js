import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";


function Navigation({sessionLoaded}){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (<ProfileButton user={sessionUser} />);
    }else{
        sessionLinks = (
            <div>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up<br /></NavLink>
            </div>
        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {sessionLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
