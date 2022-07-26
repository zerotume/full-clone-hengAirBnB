import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readOneSpotAction } from "../../store/spots";

function SpotsDetailShow(){
    // const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    let currentSpot = useSelector(state => state.spots[id]);
    useEffect(() => {
        dispatch(readOneSpotAction(id));
    },[dispatch,id])

    if(!currentSpot || !currentSpot.Owner || !currentSpot.images){console.log('Not Rendered');return null};

        return (
            <div className="detail-holder">
                <div className="title-info">
                    <div className="title-name">{`Cat's spot hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</div>
                    <div className="title-review">{}</div>
                </div>
                <div className="image-holder">
                    <img className="detail-img-1" src="" alt=""></img>
                    <img className="detail-img-2" src="" alt=""></img>
                    <img className="detail-img-3" src="" alt=""></img>
                    <img className="detail-img-4" src="" alt=""></img>
                    <img className="detail-img-5" src="" alt=""></img>
                </div>
                <div className="detail-info">
                    <div className="detail-info-head"></div>
                </div>
            </div>
        );
}

export default SpotsDetailShow;
