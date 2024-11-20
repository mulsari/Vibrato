import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색"
        className="bg-searchBar rounded-full w-full pl-9 py-1.5 focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
