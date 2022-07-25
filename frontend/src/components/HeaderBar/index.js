// import {ReactComponent as logo} from '../../assets/icon/catbnb.svg';
import { NavLink, Link } from 'react-router-dom';
import './headerbar.css';

function HeaderBar(){
    return (
        // <div className="header-container">
            <header className='header-bar'>
                <div className='icon-holder'>
                <Link className="icon-nav" exact to="/">
                    <i className="fa-solid fa-cat fa-xl"></i>
                    <span className='icon-text'>catbnb</span>
                </Link>
                </div>
            </header>

        // </div>
    );
}

export default HeaderBar;
