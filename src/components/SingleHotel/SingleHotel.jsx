import { useParams } from "react-router-dom";
import { useHotels } from "../Context/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();
  const { getHotels, currentHotel, isLoadingCurrentHotel } = useHotels();
  useEffect(()=>{
    getHotels(id);
  },[id])
  if(isLoadingCurrentHotel || !currentHotel)<p>Loading</p>
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
            {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name}/>
      </div>
    </div>
  );
};

export default SingleHotel;
