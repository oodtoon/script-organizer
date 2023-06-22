import { Link, useNavigate } from "react-router-dom";

const HomeButton = (props) => {
    const navigate = useNavigate()

    return (
        <>
        <Link to="/">{props.place}</Link>
        </>
    )
}

export default HomeButton