import { Link } from "react-router-dom";

function HostButton(){
    return (
        <Link to='/spots/myspots'>
            <button className="header-button">Host your spot</button>
        </Link>
    );
}

export default HostButton;
