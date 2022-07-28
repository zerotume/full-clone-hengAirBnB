import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotAction, readUserSpotsAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";
import {Link} from "react-router-dom"

function MySpots({sessionLoaded}){
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    let mySpots = useSelector(state => state.spots.mySpots);
    useEffect(() => {
        dispatch(readUserSpotsAction());
    },[dispatch]);

    const deleteClick = id => async e => {
        e.preventDefault();
        await dispatch(deleteSpotAction(id));
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

    if(!mySpots || !mySpots.mySpotsArray)return null;

    return(
        <>
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
            <div className="sub-page-holder">
            <div className='booking-ad-header'>
                    <div className='booking-ad-left-wrap'>
                        <div className='booking-left-icon spot-left-icon'>
                            <img className='booking-left-icon-img spot-left-icon-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWygc_8PN5XndTuEvhnCgYJ0PfIOszbG83w&usqp=CAU'>
                            </img>
                        </div>
                        <div className='booking-left-title'>Create a spot...<br /> and earn not only money!</div>
                        <div className='booking-left-text'>Our spot hosts benefit not only financial profit from sharing</div>
                        <div className='booking-left-button'><Link to="/spots/newspot">Share a new spot</Link></div>
                    </div>
                    <div className='booking-ad-right-wrap'>
                        <img className='booking-right-img' src='https://upload.wikimedia.org/wikipedia/commons/6/65/Cat_in_Winter.JPG'></img>
                    </div>
                </div>
                <h1 className="list-page-header">Manage Your Listings</h1>
                <table className="my-spots-table my-stuff-table">
                    <tr className="my-spots-table-header my-table-header">
                        <td className="table-delete">
                            Delete?
                        </td>
                        <td>
                            Spots
                        </td>
                        <td>
                            Address
                        </td>
                        <td>
                            Location
                        </td>
                        <td>
                            Price
                        </td>
                        <td>
                            Last Modified
                        </td>
                        <td className="table-edit">
                            Edit Button
                        </td>
                    </tr>
                    {mySpots.mySpotsArray.map(e => (
                        <tr className="my-spots-table-content my-table-content">
                            <td>
                                <button onClick={deleteClick(e.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                            <td className="my-spots-table-img-text my-table-img-text">
                                <Link to={`/spots/${e.id}`}>
                                    <img src={e.previewImage&&e.previewImage[0]?e.previewImage[0].url:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'}></img>
                                    <span>{e.name}</span>
                                </Link>
                            </td>
                            <td>
                                <span>{e.address}</span>
                            </td>
                            <td>
                                <span>{e.city}, {e.state}, {e.country}</span>
                            </td>
                            <td>
                                <span>{e.price}</span>
                            </td>
                            <td>
                                <span>{e.updatedAt}</span>
                            </td>
                            <td className="table-edit">
                                <Link to={`/spots/${e.id}/edit`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </>

    );
}

export default MySpots;
