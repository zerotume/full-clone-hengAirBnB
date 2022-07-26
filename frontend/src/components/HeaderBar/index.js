// import {ReactComponent as logo} from '../../assets/icon/catbnb.svg';
import { NavLink, Link } from 'react-router-dom';
import './headerbar.css';
import Navigation from '../Navigation';

function IconLink(){
    return (
        <div className='icon-holder'>
            <Link className="icon-nav" to="/">
                <i className="fa-solid fa-cat fa-xl"></i>
                <span className='icon-text'>catbnb</span>
            </Link>
    </div>
    );
}



function HeaderBar({sessionLoaded, main}){
    return (
        // <div className="header-container">
            <div className={'header-bar ' + (main?"main":"sub")}>
                <IconLink />
                <Navigation sessionLoaded={sessionLoaded}/>
            </div>

        // </div>
    );
}

export default HeaderBar;
