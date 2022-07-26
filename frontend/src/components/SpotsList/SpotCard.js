function SpotCard({spot}){

    return (
        <div className="spot-card-holder">
            <img className="spot-card-img" src={spot.previewImage&&spot.previewImage.length?spot.previewImage[0].url:'https://images.freeimages.com/images/large-previews/064/cat-1537181.jpg'} />
            <div className="spot-info-holder">
                <div className="spot-card-name">{spot.name}</div>
                <div className="spot-card-review">★ ?.??</div>
                <div className="spot-card-city-state">{spot.city}, {spot.state}</div>
                <div className="spot-card-country">{spot.country}</div>
                <div className="spot-card-price">${spot.price} /night</div>
            </div>
        </div>
    );
}

export default SpotCard;
