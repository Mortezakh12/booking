import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
function HotelsProvider({ children }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const destination = serachParams.get("destination");
  const room = JSON.parse(serachParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotels(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <HotelContext.Provider value={{ isLoading, hotels,getHotels,currentHotel,isLoadingCurrentHotel }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
