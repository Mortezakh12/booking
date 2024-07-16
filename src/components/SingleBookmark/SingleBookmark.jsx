import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBookmarks } from "../Context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoadingCurrentBookmark } =
    useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="singleBookmark">{currentBookmark.cityName}</h2>

      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />{" "}
        &nbsp;
        <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.countryName}</span>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; back
      </button>
    </div>
  );
};

export default SingleBookmark;
