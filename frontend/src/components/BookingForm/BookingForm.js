import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { createSpotAction, updateSpotAction } from "../../store/spots";
import { createBookingAction,updateBookingAction } from "../../store/bookings";
import HeaderBar from "../HeaderBar";


function BookingForm({booking, formType, setShowEdit}){
    const todayString = (new Date()).toISOString().slice(0,10);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [startDate, setStartDate] = useState(booking.startDate || todayString);
    const [endDate, setEndDate] = useState(booking.endDate || todayString);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if(!user) {
        return (
            <>
                <span>Login in to make bookings!</span>
            </>
        )
    }

    const actions = {
        "Create Booking":createBookingAction,
        "Update Booking":updateBookingAction
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(startDate);
        // console.log(endDate);
        booking = {
            ...booking,
            startDate,
            endDate
        }
        // console.log(booking)
        setErrors([]);
        // console.log(booking);

        let newBooking = await dispatch(actions[formType](booking))
                    // .then(async (res) => {
                    //     if(!res.errors)
                    //     return res;
                    // })
                    .catch(async prevData => {
                        if(!prevData.name){
                            const data = await prevData.json();
                            // console.log(data.errors[0]);
                            if(data && data.errors) setErrors([data.errors[0].message]);
                        }
                        // console.log(prevData);
                    });
        // console.log(newBooking);
        if(newBooking){
            if(formType==="Update Booking")setShowEdit(-1);
            history.push(`/mybookings`);
        }
    }

    return(
        <div className="booking-form-holder">
                <form className="catbnb-form booking-form" onSubmit={handleSubmit}>
                <h2>{formType}</h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>



            <label>
                Start Date:</label>
                <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                />

            <label>
                End Date:</label>
                <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                />

            <input className="user-form-input-button booking-form-input-button" type="Submit" value={formType} />
            </form>
        </div>
    );




}

export default BookingForm;
