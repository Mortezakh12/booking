import useFetch from "../../Hooks/useFetch";

const LocationList = () => {
  const { isLoading, data } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) <p>data is loading...</p>;
  return (
      <div className="nearbyLocation">
        <h2>Nearby Location</h2>
      <div className="locationList">
      {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <div className="locationItem">
                <img src={item.xl_picture_url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    € &nbsp; {item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  );
};

export default LocationList;
