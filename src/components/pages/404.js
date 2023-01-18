import { Link } from 'react-router-dom';
import error from '../assets/7iJU.gif'
import Navbar from './navbar';
import { Helmet } from 'react-helmet';

const Error = () => {
    return ( 
        <>
        <Helmet>
            <title>404-page not found</title>
        </Helmet>
            <Navbar />
            <div className='h-full flex justify-center items-center'>
                <img src={error} alt="" />
                <div className=' border-l-4 flex flex-col justify-center items-start p-3 border-l-gray-700 h-48'>
                    <h1>Page not Found</h1>
                    <p>Check the URL! or Go back to <Link to='/'>login</Link></p>
                </div>
            </div>
        </>
     );
}
 
export default Error;