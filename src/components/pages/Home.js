import {ref,onValue} from 'firebase/database';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import not from '../assets/notfound.gif';
import {signOut,onAuthStateChanged} from 'firebase/auth'

const Home = () => {
    const navigate = useNavigate()
    const [books,setBooks] = useState([])
    const signOt = ()=>{
        signOut(auth)
        navigate('/',{replace:true})
    }
    let userName
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(!user){
                navigate('/',{replace:true})
            }else{
                userName = user.email
            }
        })
    },[])
    console.log(userName)
    
    return ( 
        <>
            <Navbar />
            <div className=' flex flex-col justify-center items-center'>
                <button onClick={()=>{
                    const look = ref(db,'Books/');
                    onValue(look,(snapshot)=>{
                        setBooks(snapshot.val());
                    })
                    console.log(books)
                }}
                    className='w-96 bg-blue-500 p-2 text-white text-xl font-extrabold rounded-xl mt-2'
                >Find</button>
                <div className='justify-end items-end text-white'>
                    <button className=' bg-red-500 p-2 rounded' onClick={signOt}>Signout</button>
                </div>
            </div>
            {books ? books.map((book)=>(
                <>
                  <Link to={`/books/${book.id}`} className='flex justify-center items-center mb-3 mt-1'>
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <img class="rounded-t-lg" src={book.img} alt="" crossOrigin='anonymous' />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.author}</p>
                        </div>
                    </div>
                  </Link>
                </>
            )):
            <div className='flex justify-center items-center'>
                <img src={not} alt='' />
                <div className='text-2xl font-bold'>No Books Are available</div>
            </div>
            }
        </>
     );
}
 
export default Home;
