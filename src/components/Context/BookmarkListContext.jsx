import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (item) => item.id !== action.payload
        ),
        currentBookmark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action");
  }
}

function BookmarkListProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);

  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an error occurded in loaded data",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    // setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      // setCurrentBookmark(data);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
    dispatch({ type: "rejected", payload: "an error occurded in loaded data" });
  }

  async function createBookmark(newBookmark) {
    // setIsLoading(true);
    dispatch({ type: "loading" });

    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      // setCurrentBookmark(data);
      // setBookmarks((prev) => [...prev, data]);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
    dispatch({ type: "rejected", payload: "an error occurded in loaded data" });
  }

  async function deletBookmark(id) {
    // setIsLoading(true);
    dispatch({ type: "loading" });

    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
    }
    dispatch({ type: "rejected", payload: "an error occurded in loaded data" });
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        isLoading,
        getBookmark,
        createBookmark,
        deletBookmark,
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
