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
import ImageUploader from "./ImageUploader";
import { deleteReviewAction, readSpotReviewsAction } from "../../store/reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewImageUploader from "./ReviewImageUploader";

const meowWaiting = process.env.PUBLIC_URL+"/assets/meowWaiting.jpg"


function SpotsDetailShow({sessionLoaded}){
    // const [loaded, setLoaded] = useState(false);

    const maxNumber = 5;
    const dispatch = useDispatch();
    const {id} = useParams();
    let currentSpot = useSelector(state => state.spots[id]);
    let user = useSelector(state => state.session.user);
    let bookings = useSelector(state => state.bookings)
    let reviews = useSelector(state => state.reviews)
    const [showPicModal, setShowPicModal] = useState(-1);
    const [images, setImages] = useState(currentSpot.images || []);
    const [showReviewPicModal, setShowReviewPicModal] = useState(-1);
    const [reviewImages, setReviewImages] = useState([]);
    const [showReviewEdit, setShowReviewEdit] = useState(-1);
    const [showReviewCreate, setShowReviewCreate] = useState(false);
    const [renderer, setRenderer] = useState({});
    useEffect(() => {
        dispatch(readOneSpotAction(id));
    },[dispatch,id, showPicModal]);

    useEffect(() => {
        dispatch(readSpotBookingsAction(id));
    },[dispatch,id,user]);

    useEffect(() => {
        dispatch(readSpotReviewsAction(id));
    },[dispatch,id,user, reviews.spotReviewsArray?.length]);
    const history = useHistory();

    const deleteClick = async e => {
        e.preventDefault();
        const data = await dispatch(deleteSpotAction(id));

        if(data.statusCode === 200){
            history.push('/');
        }
    }

    const dateString = (new Date()).toISOString().slice(0,10);

    const deleteReviewClick = id => async e => {
        e.preventDefault();
        const data = await dispatch(deleteReviewAction(id));

        if(data.statusCode === 200){
            setRenderer({});
        }
    }

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
            bookingContent = currentSpot.ownerId === userId?
                                            (
                                                <span className="no-booking">
                                                    No bookings for this spot! Try to tell others about it?
                                                </span>
                                            ):(
                                                <span className="no-booking">
                                                    No bookings for this spot! Be the first visitor of it?
                                                </span>
                                            );
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
        let reviewContent;
        let userReviewed;
        if(!reviews ||
            !reviews.spotReviews ||
            !reviews.spotReviews.spotReviewsArray ||
            !reviews.spotReviews.spotReviewsArray.length){
                reviewContent = currentSpot.ownerId === userId?
                                    (
                                        <span className="no-review">
                                            No reviews for this spot! Try to get in touch with your visitors?
                                        </span>
                                    ):(
                                        <span className="no-review">
                                            No reviews for this spot! Be the first one giving thanks or thunks?
                                        </span>
                                    );
            }else{
                let spotReviews = reviews.spotReviews;
                userReviewed = spotReviews.reviewed;
                reviewContent = (
                 <ul>
                    <span className="spot-review-header"><h2>Reviews</h2></span>
                    {sessionLoaded && spotReviews && spotReviews.spotReviewsArray && spotReviews.spotReviewsArray.map(e => (
                        <li key={e.id}>
                            <div className="spot-single-review">
                                <div className="spot-single-review-user">
                                    <div className="spot-single-review-avatar-container">
                                        {e.User?.profileImg?
                                            (
                                                <img className="spot-single-review-avater" src={e.user.profileImg} />
                                            ):(
                                                <i className="spot-single-review-icon fas fa-user-circle"></i>
                                            )
                                        }
                                    </div>
                                    <div className="spot-single-review-info-container">
                                        <p className="spot-single-review-info-name">{e.User?.firstName} {e.User?.lastName}</p>
                                        <p className="spot-single-review-info-date">{e.createdAt?.slice(0,10)}</p>
                                    </div>
                                </div>
                                <div className="spot-single-review-content">
                                    <div className="spot-single-review-text">
                                        <p>{e.review}</p>
                                        <div className="review-buttons">
                                            <button className="review-edit-button" onClick={() => setShowReviewEdit(e.id)} disabled={e.userId !== user.id} hidden={e.userId !== user.id}><i class="fa-solid fa-gear"></i></button>
                                            <button className='review-delete-button' onClick={deleteReviewClick(e.id)} disabled={e.userId !== user.id} hidden={e.userId !== user.id}><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <div className="spot-single-review-images">
                                        {e.images && !!e.images.length && e.images.map(img => (
                                            <>
                                                <img className={`review-img ${e.userId===user.id?'review-img-click':''}`}
                                                    src={img.url}
                                                    onClick={() => e.userId === user.id?setShowReviewPicModal(e.id):null}

                                                />
                                                {e.userId === user.id && showReviewPicModal === e.id && (
                                                    <Modal className="img-modal review-img-modal" onClose={() => setShowReviewPicModal(-1)} >
                                                        <p>Upload your review image!</p>
                                                        <ReviewImageUploader
                                                            spotId={currentSpot.id}
                                                            reviewId={e.id}
                                                            imageData={img || null}
                                                            type={'edit'}
                                                            imgnum={e.images.length}
                                                            showReviewPicModal={showReviewPicModal}
                                                            setShowReviewPicModal={setShowReviewPicModal}
                                                        />
                                                    </Modal>
                                                )}
                                            </>
                                        ))}
                                        {e.userId === user.id && e.images.length < 5 && (
                                            <>
                                                <div className="add-review-image-button" onClick={() => setShowReviewPicModal(-5)}>
                                                    <i class="fa-solid fa-plus"></i>
                                                    {/* <span><br/>{showReviewPicModal} {e.userId} {user.id}</span> */}
                                                </div>
                                                {e.userId === user.id && showReviewPicModal === -5 && (
                                                    <Modal className="img-modal review-img-modal" onClose={() => setShowReviewPicModal(-1)} >
                                                    <p>Upload your review image!</p>
                                                    <ReviewImageUploader
                                                        spotId={currentSpot.id}
                                                        reviewId={e.id}
                                                        imageData={null}
                                                        type={'add'}
                                                        imgnum={e.images.length}
                                                        showReviewPicModal={showReviewPicModal}
                                                        setShowReviewPicModal={setShowReviewPicModal}
                                                    />
                                                </Modal>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="update-review-show" hidden={e.id!==showReviewEdit}>
                                    <ReviewForm type={'edit'} spotId={id} review={e}
                                                showReviewCreate={showReviewCreate}
                                                setShowReviewCreate={setShowReviewCreate}
                                                showReviewEdit={showReviewEdit}
                                                setShowReviewEdit={setShowReviewEdit}
                                                sessionLoaded={sessionLoaded}
                                                setRenderer={setRenderer}
                                    />
                                    <button className="close-review-form-button"
                                        onClick={() => setShowReviewEdit(-1)}>
                                                Cancel
                                                <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
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
                                            className={`detail-img-${(i+1).toString()}-wrapper detail-img-${size}-wrapper ${currentSpot.ownerId===userId?'detail-img-wrapper':''}`}
                                            onClick={() => currentSpot.ownerId === userId?setShowPicModal(i):null}
                                            >
                                            <img
                                                className={`detail-img-${(i+1).toString()} detail-img-${size} detail-img`}
                                                src={currentSpot.images[i]?currentSpot.images[i].url:catWait}
                                                alt=""
                                            />
                                            {currentSpot.ownerId === userId && (<div className={`img-text img-text-${size}`}>{currentSpot.images[i]?'Click to Change':'Click to Add'}</div>)}
                                        </div>
                                        {currentSpot.ownerId === userId && showPicModal === i && (
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
                            <div className="detail-info-current-reviews">{reviewContent}</div>
                            {!userReviewed?currentSpot.ownerId !== userId?(
                                    <div className="create-review-show">
                                        <ReviewForm type={'create'} spotId={id} review={{}}
                                                    showReviewCreate={showReviewCreate}
                                                    setShowReviewCreate={setShowReviewCreate}
                                                    showReviewEdit={showReviewEdit}
                                                    setShowReviewEdit={setShowReviewEdit}
                                                    sessionLoaded={sessionLoaded}
                                                    setRenderer={setRenderer}
                                        />
                                    </div>
                                ):(
                                    <div className="already-reviewed">
                                        <h3>Don't review yourselves spot!</h3>
                                        <h3>Instead, why not ask who visited for a review?</h3>
                                    </div>
                                )
                                :(
                                    <div className="already-reviewed">
                                        <h3>You've already reviewed!</h3>
                                        <h3>One user, one spot, one review - to ensure our review quality.</h3>
                                    </div>
                            )}
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
            </>
        );
}

export default SpotsDetailShow;
