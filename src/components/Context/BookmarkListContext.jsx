import { createContext, useContext, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();
function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        isLoadingCurrentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmarks() {
  return useContext(BookmarkContext);
}
