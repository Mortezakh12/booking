import { createContext, useContext } from "react";
import {  useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const HotelContext = createContext();
function HotelsProvider({ children }) {
    const [serachParams, setSearchParams] = useSearchParams();
    const destination = serachParams.get("destination");
    const room = JSON.parse(serachParams.get("options"))?.room;
    const { isLoading, data:hotels } = useFetch(
      "http://localhost:5000/hotels",
      `q=${destination || ""}&accommodates_gte=${room || 1}`
    );
  return <HotelContext.Provider value={{isLoading,hotels}}>{children}</HotelContext.Provider>;
}

export default HotelsProvider;

export function useHotels(){
    return useContext(HotelContext)
}