import { Link } from "react-router-dom";
import { logo } from "../assets";

const Logo = () => {
  return (
    <Link to="/" className="outline-primary-500 inline-block outline-offset-2">
      <img src={logo} alt="Salesprit logo" />
    </Link>
  );
};

export default Logo;
