import { useHotels } from "../Context/HotelsProvider";

export default function Map() {
  const { isLoading, hotels } = useHotels();
  return <div className="mapContainer">map</div>;
}
