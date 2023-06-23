import { Link } from "react-router-dom";
import "../App.css";

const HomeButton = (props) => {
  return (
    <>
      <Link to="/" className="home-btn">
        {props.place}
      </Link>
    </>
  );
};

export default HomeButton;
