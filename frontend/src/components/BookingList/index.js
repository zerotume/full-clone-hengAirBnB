import './BookingList.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotAction, readUserSpotsAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";
import {Link} from "react-router-dom"
import {readUserBookingsAction} from '../../store/bookings';

function BookingList({sessionLoaded}){
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    let bookings = useSelector(state => state.bookings);

    useEffect(() => {
        dispatch(readUserBookingsAction());
    },[dispatch]);

    const deleteClick = id => async e => {
        e.preventDefault();
        // await dispatch(deleteSpotAction(id));
    }

    const dateString = (new Date()).toISOString();

    const getBookingStatus = (startDate,endDate) => {
        if(startDate > dateString){
            return 'Oncoming'
        }else if(startDate <= dateString && endDate >= dateString){
            return 'Enjoying it'
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
                        <td>
                            Edit?
                        </td>
                    </tr>
                    {myBookings.myBookingsArray.map(e => (
                        <tr className="my-bookings-table-content my-table-content">
                            <td>
                                <button onClick={deleteClick(e.id)} disabled={dateString < e.startDate}><i class="fa-solid fa-trash"></i></button>
                            </td>
                            <td className="my-bookings-table-img-text my-table-img-text">
                                <Link to={`/spots/${e.Spot.id}`}>
                                    {/* <img src={e.Spot.previewImage&&e.Spot.previewImage[0]?e.Spot.previewImage[0].url:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'}></img> */}
                                    <span>{e.Spot.name}</span>
                                </Link>
                            </td>
                            <td>
                                <span>{e.Spot.address}</span>
                            </td>
                            <td>
                                <span>{e.Spot.city}, {e.Spot.state}, {e.Spot.country}</span>
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
                            <td>
                                <Link to={`/bookings/${e.id}/edit`}>
                                    Edit Booking
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>

        )
    }

    return (
        <div className="sub-page-holder">
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
            {bookingContent}
        </div>
    )
}

export default BookingList;
