import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/">
        <img
          src={logo}
          alt="Vibrato Logo"
          className="min-w-[120px] max-w-[120px] h-auto"
          style={{ aspectRatio: "374 / 169" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
