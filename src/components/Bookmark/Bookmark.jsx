import { Link } from "react-router-dom";
import { useBookmarks } from "../Context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmark } = useBookmarks();

  if (isLoading) return <p>loading</p>;
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/bookmark/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} /> &nbsp;
                <strong>{item.cityName}</strong> &nbsp;
                <span>{item.countryName}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
