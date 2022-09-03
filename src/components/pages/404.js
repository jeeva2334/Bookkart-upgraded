import { Link } from 'react-router-dom';
import error from '../assets/7iJU.gif'

const Error = () => {
    return ( 
        <>
            <div>
                <img src={error} alt="" />
                <h1>Page not Found</h1>
                <p>Check the URL! or Go back to <Link to='/'>login</Link></p>
            </div>
        </>
     );
}
 
export default Error;