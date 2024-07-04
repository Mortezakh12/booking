import { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="headerSearchInput"
            placeholder="where to go?"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/06/23</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            1 adult &bull; 2 children &bull; 3 room
          </div>
          {openOptions && <GuestOptionList />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOptionList() {
  return (
    <div className="guestOptions">
      <div className="guestOptionItem">
        <span className="optionText">Adult</span>
        <div className="optionCounter">
          <button className="optionCounterBtn">
            <HiMinus className="icon" />
          </button>
          <span className="optionCounterNumber">2</span>
          <button className="optionCounterBtn">
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
