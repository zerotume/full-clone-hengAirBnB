import './BookingList.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotAction, readUserSpotsAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";
import {Link} from "react-router-dom"
import {readUserBookingsAction, deleteBookingAction} from '../../store/bookings';
import BookingForm from '../BookingForm/BookingForm';

function BookingList({sessionLoaded}){
    const user = useSelector(state => state.session.user);
    const [showEdit,setShowEdit] = useState(-1);

    const dispatch = useDispatch();
    let bookings = useSelector(state => state.bookings);

    useEffect(() => {
        dispatch(readUserBookingsAction());
    },[dispatch]);

    const deleteClick = id => async e => {
        e.preventDefault();
        await dispatch(deleteBookingAction(id));
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

    if(!user) {
        return (
            <>
                <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
                <div className="sub-page-holder">
                    <span className="log-in-warning">You're not logged in!</span>
                </div>
            </>
        )
    }

    let bookingContent;
    if(!bookings || !bookings.myBookings || !bookings.myBookings.myBookingsArray || !bookings.myBookings.myBookingsArray.length){
        bookingContent = (
            <div className='my-booking-no-content my-no-content'>
                <div>
                    <h1>Sorry, you don't have bookings!</h1>
                </div>
            </div>
        );
    }else{
        let myBookings = bookings.myBookings;
        bookingContent = (
                <table className="my-booking-table my-stuff-table">
                    <tr className="my-booking-table-header my-table-header">
                        <td>
                            Delete?
                        </td>
                        <td>
                            Oncoming Spot
                        </td>
                        <td>
                            Address
                        </td>
                        <td>
                            Location
                        </td>
                        <td>
                            Start Date
                        </td>
                        <td>
                            End Date
                        </td>
                        <td>
                            Status
                        </td>
                        <td className='table-edit'>
                            Edit?
                        </td>
                    </tr>
                    {myBookings.myBookingsArray.map(e => (
                        <>

                            <tr className="my-bookings-table-content my-table-content">
                                <td>
                                    <button onClick={deleteClick(e.id)} disabled={dateString > e.startDate}><i class="fa-solid fa-trash"></i></button>
                                </td>
                                <td className="my-bookings-table-img-text my-table-img-text">
                                    <Link to={`/spots/${e.spotId}`}>
                                        {/* <img src={e.Spot.previewImage&&e.Spot.previewImage[0]?e.Spot.previewImage[0].url:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'}></img> */}
                                        <span>
                                            {!e.Spot && "Loading..."}
                                            {e.Spot && e.Spot.name}
                                        </span>
                                    </Link>
                                </td>
                                <td>
                                    <span>
                                        {!e.Spot && "Loading..."}
                                        {e.Spot && e.Spot.address}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {!e.Spot && "Loading..."}
                                        {e.Spot && `${e.Spot.city}, ${e.Spot.state}, ${e.Spot.country}`}</span>
                                </td>
                                <td>
                                    <span>{e.startDate}</span>
                                </td>
                                <td>
                                    <span>{e.endDate}</span>
                                </td>
                                <td>
                                    {getBookingStatus(e.startDate,e.endDate)}
                                </td>

                                <td className='table-edit'>
                                    <button onClick={() => setShowEdit(e.id)} disabled={dateString > e.startDate}>
                                        Edit Booking
                                    </button>
                                </td>
                            </tr>
                            <div className='update-booking-show' hidden={e.id!==showEdit}>
                                <BookingForm formType={"Update Booking"} booking={e} setShowEdit={setShowEdit}/>
                                <button className='close-booking-form-button' onClick={() => setShowEdit(-1)}>x</button>
                            </div>
                        </>
                    ))}
                </table>

        )
    }

    return (
        <>
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
            <div className="sub-page-holder booking-sub-page-holder">
                <div className='booking-ad-header'>
                    <div className='booking-ad-left-wrap'>
                        <div className='booking-left-icon'></div>
                        <div className='booking-left-title'></div>
                        <div className='booking-left-text'></div>
                        <div className='booking-left-button'></div>
                    </div>
                    <div className='booking-ad-right-wrap'>
                        <img className='booking-right-img'></img>
                    </div>
                </div>
                <h2 className='booking-content-title'>Your Current Bookings...</h2>
                {bookingContent}
            </div>
        </>
    )
}

export default BookingList;
