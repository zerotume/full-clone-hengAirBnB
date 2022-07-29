import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { createSpotAction, updateSpotAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";


function SpotForm({spot, formType, sessionLoaded}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState(spot.name || '');
    const [address, setAddress] = useState(spot.address || '');
    const [city, setCity] = useState(spot.city || '');
    const [state, setState] = useState(spot.state || '');
    const [country, setCountry] = useState(spot.country || '');
    const [lat, setLat] = useState(spot.lat || "");
    const [lng, setLng] = useState(spot.lng || "");
    const [price, setPrice] = useState(spot.price || "");
    const [description, setDescription] = useState(spot.description || '');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

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

    const actions = {
        "create":createSpotAction,
        "update":updateSpotAction
    }

    const handleSubmit = async e => {
        e.preventDefault();
        spot = {
            ...spot,
            name,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price,
            description
        }
        setErrors([]);
        // console.log(spot);

        let newSpot = await dispatch(actions[formType](spot,spot.id))
                    // .then(async (res) => {
                    //     if(!res.errors)
                    //     return res;
                    // })
                    .catch(async prevData => {
                        if(!prevData.name){
                            const data = await prevData.json();
                            if(data && data.errors) setErrors(Object.values(data.errors[0].errors));
                        }
                        // console.log(prevData);
                    });
        console.log(newSpot);
        if(newSpot)history.push(`/spots/${newSpot.id}`);
    }

    return(
        <>
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
            <div className="form-page-holder">
                <div className="form-leftside-bg">
                    <h1>Being a host <br/> And <br /> Know More Cats!</h1>
                </div>
                <div className="cat-form-wrapper">
                    <form className="catbnb-form spot-form" onSubmit={handleSubmit}>
                        <h2>{formType==="create"?"Create a new spot":"Update an exist spot"}</h2>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>

                        <input
                        type="text"
                        placeholder="Name your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="Address of your spot"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="Lat between -90 to 90"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="Lng between -180 to 180"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        />
                    </label>
                    <label>

                        <input className="spot-form-textarea"
                        type="textarea"
                        placeholder="Describe your spot!"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </label>
                    <input className="spot-submit" type="Submit" value={formType==="create"?"Create New Spot":"Update Your Spot"} />
                    <Link to='/'>Return to main page</Link>
                    </form>
                </div>
            </div>

        </>
    );




}

export default SpotForm;
