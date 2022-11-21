import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {readAllSpotsAction} from '../../store/spots';
import SpotCard from "./SpotCard";
import './SpotsList.css';
import HeaderBar from "../HeaderBar";

function SpotsList({sessionLoaded}) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readAllSpotsAction());
    },[dispatch])

    const spotsArray = useSelector(state => state.spots.spotsArray);

    return (
        <>
            <HeaderBar sessionLoaded={sessionLoaded} main={true}/>
            <div className="index-header-container">
                <h2 className="index-header index-header-top">Furry friends, let's hang out with other cats!</h2>
                <h2 className="index-header index-header-down">Travel Meow, Meet Meow, Know Meow</h2>
            </div>
            <div className="spots-index">
                {spotsArray.map(e => (
                    <Link style={{textDecoration: 'none', color: '#222222'}} to={`/spots/${e.id}`}>
                        <SpotCard spot={e}/>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default SpotsList;
