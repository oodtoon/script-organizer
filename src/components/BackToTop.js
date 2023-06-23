import { Link } from "react-router-dom"
import "../App.css"

const BackToTop = ({ handleScroll }) => {
    return (
        <>
        <Link onClick={handleScroll} className="scroll-link">Back To Top</Link>
        </>
    )
}

export default BackToTop