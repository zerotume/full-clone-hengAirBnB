import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { readOneSpotAction, deleteSpotAction } from "../../store/spots";
import "./SpotsDetailShow.css";
import HeaderBar from "../HeaderBar";
import { readSpotBookingsAction } from "../../store/bookings";
import BookingForm from "../BookingForm/BookingForm";
import ImageUploading from "react-images-uploading";
import Modal from "../../context/Modal";
import catWait from "../../assets/meowWaiting.jpg"
import ImageUploader from "./imageUploader";

const meowWaiting = process.env.PUBLIC_URL+"/assets/meowWaiting.jpg"


function SpotsDetailShow({sessionLoaded}){
    // const [loaded, setLoaded] = useState(false);

    const maxNumber = 5;
    const dispatch = useDispatch();
    const {id} = useParams();
    let currentSpot = useSelector(state => state.spots[id]);
    let user = useSelector(state => state.session.user);
    let bookings = useSelector(state => state.bookings)
    const [showPicModal, setShowPicModal] = useState(-1);
    const [images, setImages] = useState(currentSpot.images || []);
    useEffect(() => {
        dispatch(readOneSpotAction(id));
    },[dispatch,id, showPicModal]);

    useEffect(() => {
        dispatch(readSpotBookingsAction(id));
    },[dispatch,id,user]);
    const history = useHistory();

    const deleteClick = async e => {
        e.preventDefault();
        const data = await dispatch(deleteSpotAction(id));

        if(data.statusCode === 200){
            history.push('/');
        }
    }

    const dateString = (new Date()).toISOString().slice(0,10);

    const onImgChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    // const picClick = e => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setShowPicModal(true);
    // }

    const getBookingStatus = (startDate,endDate) => {
        if(startDate > dateString){
            return 'Oncoming'
        }else if(startDate <= dateString && endDate >= dateString){
            return 'Enjoying'
        }else{
            return 'Finished'
        }
    }
    let userId;
    if(!user) {
        return (
            <>
                <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
                <div className="sub-page-holder">
                    <span className="log-in-warning">You're not logged in!</span>
                </div>
            </>
        )
    }else{
        userId = user.id;
    }

    if(!currentSpot || !currentSpot.Owner || !currentSpot.images){return <HeaderBar sessionLoaded={sessionLoaded} main={false}/>};

    let bookingContent;
    if(!bookings ||
        !bookings.spotBookings ||
        !bookings.spotBookings.spotBookingsArray ||
        !bookings.spotBookings.spotBookingsArray.length){
            bookingContent = (<span>No bookings for this spot!</span>)
        }else{
            let spotBookings = bookings.spotBookings;

            bookingContent = (
             <ul>
                <span className="spot-booking-header">Bookings for this spot</span>
                {spotBookings.spotBookingsArray.map(e => (
                    <li key={e.id}>
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
                        <div className="title-review">{currentSpot.avgStarRating?`★ ${parseInt(currentSpot.avgStarRating).toFixed(2)}`:`★ New!`}{" · "}{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</div>
                        {currentSpot.ownerId === userId && (
                            <div className="title-owner-buttons">
                                <Link to={`/spots/${id}/edit`}>edit</Link>
                                <button onClick={deleteClick}>delete this spot</button>
                                {/* <button onClick={picClick}>Image Change</button> */}
                            </div>
                        )}
                    </div>
                    <div className="image-holder">
                        {(() => {
                            let imgs = [];
                            for(let i = 0; i <= 4; i++){
                                let size = i===0?'big':'small';
                                let img = currentSpot.images[i];
                                imgs.push(
                                    // <button onClick={() => setShowPicModal(i)}>
                                    <>
                                        <div
                                            className={`detail-img-${(i+1).toString()}-wrapper detail-img-${size}-wrapper detail-img-wrapper`}
                                            onClick={() => setShowPicModal(i)}
                                            >
                                            <img
                                                className={`detail-img-${(i+1).toString()} detail-img-${size} detail-img`}
                                                src={currentSpot.images[i]?currentSpot.images[i].url:catWait}
                                                alt=""
                                            />
                                            <div className={`img-text img-text-${size}`}>{currentSpot.images[i]?'Click to Change':'Click to Add'}</div>
                                        </div>
                                        {showPicModal === i && (
                                            <Modal className="img-modal spot-img-modal" onClose={() => setShowPicModal(-1)}>
                                                {/* <p>Looking At {showPicModal}</p> */}
                                                <div className="img-modal-holder spot-img-modal-holder">
                                                    {!img? (<p>Add a image to this spot!</p>):(<p>upload your {showPicModal+1}-th image!</p>)}
                                                    <ImageUploader
                                                        url={img?.url}
                                                        spotId={currentSpot.id}
                                                        imageData={img || null}
                                                        type={img?'edit':'add'}
                                                        imgnum={currentSpot.images.length}
                                                        showPicModal={showPicModal}
                                                        setShowPicModal={setShowPicModal}
                                                    />
                                                </div>
                                            </Modal>
                                        )}
                                    </>
                                    // </button>
                                )
                            }
                            return imgs;
                        })()}
                    </div>


                        {/* <img className="detail-img-1 detail-img-big" src={currentSpot.images[0]?currentSpot.images[0]:catWait} alt=""></img>
                        <img className="detail-img-2 detail-img-small" src={currentSpot.images[1]?currentSpot.images[1]:catWait} alt=""></img>
                        <img className="detail-img-3 detail-img-small" src={currentSpot.images[2]?currentSpot.images[2]:catWait} alt=""></img>
                        <img className="detail-img-4 detail-img-small" src={currentSpot.images[3]?currentSpot.images[3]:catWait} alt=""></img>
                        <img className="detail-img-5 detail-img-small" src={currentSpot.images[4]?currentSpot.images[4]:catWait} alt=""></img> */}
                    <div className="detail-info">
                        <div className="detail-info-left-wrap">
                            <div className="detail-info-head">
                                <div className="detail-info-head-text">
                                    <div className="detail-info-head-host">{`Cat's spot hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</div>
                                    <div className="detail-info-head-avaliable">{`∞ cats · ∞ plots · ∞ toys · 0 dogs ${currentSpot.price} per night!`}</div>
                                </div>
                                {/* <img className="detail-info-head-img" /> */}
                            </div>
                            {/* <div className="detail-info-notice">
                                <div className="free-cancelation"></div>
                            </div> */}
                            {/* <div className="detail-info-catcover">
                                <img className="detail-info-catcover-img" />
                                <div className="detail-info-catcover-text"></div>
                            </div> */}
                            <div className="detail-info-description">Description: <br />{currentSpot.description}!</div>
                            {/* <div className="detail-info-sleep"></div>
                            <div className="detail-info-amenities"></div> */}
                            <div className="detail-info-current-bookings">{bookingContent}</div>
                        </div>
                        <div className="detail-info-right-booking">
                            {currentSpot.ownerId !== userId && (
                                <BookingForm formType={"Create Booking"} booking={{spotId:id}}/>
                            )}
                            {currentSpot.ownerId === userId && (
                                <h1>You cannot book your own spot!</h1>
                            )}

                        </div>
                    </div>
                </div>
                {/* {showPicModal && (
                    <Modal className="picset-modal" onClose={() => setShowPicModal(false)}>

                    </Modal>
                )} */}
            </>
        );
}

export default SpotsDetailShow;
