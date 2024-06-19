import { Link } from "react-router-dom";
import { logo } from "../assets";

const Logo = () => {
  return (
    <Link to="/" className="inline-block outline-offset-2 outline-primary">
      <img src={logo} alt="Salesprit logo" />
    </Link>
  );
};

export default Logo;
