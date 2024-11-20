import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto grid grid-cols-12 h-16 px-5 gap-10 font-semibold items-center">
        <div className="col-span-4 flex items-center">
          <Logo />
          <span className="ml-auto mr-auto w-full">
            <Navigation />
          </span>
        </div>
        <div className="col-span-5 flex-grow">
          <SearchBar />
        </div>
        <div className="col-span-3 flex-grow">
          <Profile />
        </div>
      </div>
      <hr className="col-span-12 w-full drop-shadow-md" />
    </header>
  );
};
export default Header;
