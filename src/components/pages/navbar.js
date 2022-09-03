import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBook,faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return ( 
        <div className="w-screen bg-blue-400 h-14 flex justify-between rounded-b-md">
            <div>
                <h1 className="text-2xl font-extrabold text-white pl-5 pt-3"><Link to='/home'>Book Kart</Link></h1>
            </div>
            <Link to='/home' className="pt-3  text-white text-lg font-bold"><FontAwesomeIcon icon={faHome} className='pr-1' />Home</Link>
            <Link to='/books/mybooks' className="pt-3 pr-2 text-white text-lg font-bold"><FontAwesomeIcon icon={faBook} className='pr-1' />My Books</Link>
        </div>
     );
}
 
export default Navbar;