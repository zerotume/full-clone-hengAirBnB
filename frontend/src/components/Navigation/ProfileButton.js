import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";


function ProfileButton({user}){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }


    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    },[showMenu]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logoutAction());
    }

    return (
        <>
            <button className="user-button" onClick={openMenu}>
            <i className="user-button-text fas fa-bars"></i>
                <i className="user-button-icon fas fa-user-circle"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
