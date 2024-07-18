import { Link } from "react-router-dom";
import { useBookmarks } from "../Context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmark, deletBookmark } =
    useBookmarks();

  const handleDelet = async (e, id) => {
    e.preventDefault();
    await deletBookmark(id);
  };

  if (isLoading) return <p>loading</p>;
  if (!bookmarks.length) return <p>there is no bookmark location</p>;
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
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} /> &nbsp;
                  <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.countryName}</span>
                </div>
                <button onClick={(e) => handleDelet(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
