import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readOneSpotAction, deleteSpotAction } from "../../store/spots";
import "./SpotsDetailShow.css";
import HeaderBar from "../HeaderBar";
import { readSpotBookingsAction } from "../../store/bookings";


function SpotsDetailShow({sessionLoaded}){
    // const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    let currentSpot = useSelector(state => state.spots[id]);
    let userId = useSelector(state => state.session.user.id);
    let bookings = useSelector(state => state.bookings)
    useEffect(() => {
        dispatch(readOneSpotAction(id));
    },[dispatch,id]);

    useEffect(() => {
        dispatch(readSpotBookingsAction(id));
    },[dispatch,id]);
    const history = useHistory();

    const deleteClick = async e => {
        e.preventDefault();
        const data = await dispatch(deleteSpotAction(id));

        if(data.statusCode === 200){
            history.push('/');
        }
    }

    const dateString = (new Date()).toISOString();

    const getBookingStatus = (startDate,endDate) => {
        if(startDate > dateString){
            return 'Oncoming'
        }else if(startDate <= dateString && endDate >= dateString){
            return 'Enjoying'
        }else{
            return 'Finished'
        }
    }

    if(!currentSpot || !currentSpot.Owner || !currentSpot.images){return null};

    let bookingContent;
    if(!bookings ||
        !bookings.spotBookings ||
        !bookings.spotBookings.spotBookingsArray ||
        !bookings.spotBookings.spotBookingsArray.length){
            bookingContent = (<span>Not bookings for this spot!</span>)
        }else{
            let spotBookings = bookings.spotBookings;
            bookingContent = (
             <ul>
                <span>Bookings for this spot</span>
                {spotBookings.spotBookingsArray.map(e => (
                    <li>
                        <span>
                            {getBookingStatus(e.startDate)} Booking: <br />
                        </span>
                        <span>Start Date: {e.startDate}</span><br />
                        <span>End Date: {e.endDate}</span><br />
                        {currentSpot.ownerId === userId && e.User && (
                            <span>Booked by: {e.User.firstName} {e.User.lastName}<br /></span>
                        )}
                    </li>
                ))}
             </ul>
            )
        }
        return (
            <>
                <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
                <div className="detail-holder">
                    <div className="title-info">
                        <div className="title-name">{`${currentSpot.name} in ${currentSpot.address}!`}<Link to={`/spots/${id}/edit`}></Link></div>
                        <div className="title-review">{currentSpot.avgStarRating?`★ ${parseInt(currentSpot.avgStarRating).toFixed(2)}`:`No Reviews`}</div>
                        {currentSpot.ownerId === userId && (
                            <div className="title-owner-buttons">
                                <Link to={`/spots/${id}/edit`}><button>edit</button></Link>
                                <button onClick={deleteClick}>delete this spot</button>
                            </div>
                        )}
                    </div>
                    <div className="image-holder">
                        <img className="detail-img-1" src={currentSpot.images.length?currentSpot.images[0]:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} alt=""></img>
                        <img className="detail-img-2" src={currentSpot.images.length?currentSpot.images[0]:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} alt=""></img>
                        <img className="detail-img-3" src={currentSpot.images.length?currentSpot.images[0]:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} alt=""></img>
                        <img className="detail-img-4" src={currentSpot.images.length?currentSpot.images[0]:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} alt=""></img>
                        <img className="detail-img-5" src={currentSpot.images.length?currentSpot.images[0]:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} alt=""></img>
                    </div>
                    <div className="detail-info">
                        <div className="detail-info-left-wrap">
                            <div className="detail-info-head">
                                <div className="detail-info-head-text">
                                    <div className="detail-info-head-host">{`Cat's spot hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</div>
                                    <div className="detail-info-head-avaliable">{`∞ cats · ∞ plots · ∞ toys · 0 dogs`}</div>
                                </div>
                                <img className="detail-info-head-img" />
                            </div>
                            <div className="detail-info-notice">
                                <div className="free-cancelation"></div>
                            </div>
                            <div className="detail-info-catcover">
                                <img className="detail-info-catcover-img" />
                                <div className="detail-info-catcover-text"></div>
                            </div>
                            <div className="detail-info-description"></div>
                            <div className="detail-info-sleep"></div>
                            <div className="detail-info-amenities"></div>
                        </div>
                        <div className="detail-info-right-booking">
                            {bookingContent}
                        </div>
                    </div>
                </div>
            </>
        );
}

export default SpotsDetailShow;
