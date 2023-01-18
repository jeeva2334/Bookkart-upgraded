import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBars,faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let email = "";
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                email = user.email;
                console.log(user);
            }
        })
    },[])
    const signOt = ()=>{
        signOut(auth)
        navigate('/',{replace:true})
    }
    const [navbarOpen, setNavbarOpen] = useState(false);
    return ( 
        <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              Book-kart
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={navbarOpen ? faTimes : faBars} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/home"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/mybooks"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">My Books</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="px-3 py-2 flex items-center bg-gray-500 rounded ml-4 text-xs uppercase font-bold leading-snug text-white hover:opacity-75" onClick={signOt}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>);
}
 
export default Navbar;