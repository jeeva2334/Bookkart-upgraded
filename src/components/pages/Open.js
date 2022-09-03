import { useNavigate } from 'react-router-dom';
import open from '../assets/open.gif'
import { db } from '../firebase/firebase-config';
import {set,ref} from 'firebase/database'

const Open = () => {
    const navigate = useNavigate()
    setTimeout(async ()=>{
        await set(ref(db,'values'),0);
        navigate('/home',{replace:true})
    },30000)
    return ( 
    <>
        <div className="w-screen h-14 flex justify-center items-center bg-blue-400 rounded-b-lg text-white">
                 <div className="w-screen h-14 flex justify-center items-center text-white font-extrabold text-2xl">Book Kart</div>
             </div>
        <div className=" flex flex-col ml-3 mr-1 justify-center items-center">
            <img src={open} alt='open door' />
            <h1 className='font-extrabold text-4xl'>Doors Are open please Take or keep the book safely</h1>
            <p className='font-bold text-gray-800 text-center mt-6'>Doors will be open for 30secs ... <span className='text-xl font-extrabold'>Make sure you close the door properly</span></p>
            
        </div>
        </>
     );
}
 
export default Open;