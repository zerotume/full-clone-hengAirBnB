import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {readAllSpotsAction} from '../../store/spots';
import SpotCard from "./SpotCard";
import './SpotsList.css';

function SpotsList() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readAllSpotsAction());
    },[dispatch])

    const spotsArray = useSelector(state => state.spots.spotsArray);

    return (
        <div className="spots-index">
            {spotsArray.map(e => (
                <Link style={{textDecoration: 'none', color: '#222222'}} to={`/spots/${e.id}`}>
                    <SpotCard spot={e}/>
                </Link>
            ))}
        </div>
    );
}

export default SpotsList;
