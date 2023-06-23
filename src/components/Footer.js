
import IcecreamIcon from '@mui/icons-material/Icecream';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinTongueSquint } from '@fortawesome/free-solid-svg-icons'

import "../App.css";
import { useState } from 'react';



const Footer = () => {
  const [isIce, setIsIce] = useState(true)

  const toggleIce = () => {
    setIsIce(prev => !prev)
    console.log("i lost")
  }

  const msg = isIce === true ? "Don't forget your ice cream" : "I lost the game"
  const icon = isIce === true ? <IcecreamIcon /> : <FontAwesomeIcon icon={faFaceGrinTongueSquint} />

  return (
    <>
      <div className="footer">
        <div className='foot-msg'>{msg}<button onClick={toggleIce} className='ice'>{icon}</button></div>
        
      </div>
    </>
  );
};

export default Footer;
