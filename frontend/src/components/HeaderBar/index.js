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

function userLink(){

}

function HeaderBar({sessionLoaded}){
    return (
        // <div className="header-container">
            <div className='header-bar'>
                <IconLink />
                <Navigation sessionLoaded={sessionLoaded}/>
            </div>

        // </div>
    );
}

export default HeaderBar;
