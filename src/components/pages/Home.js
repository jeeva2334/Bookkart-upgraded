import {ref,onValue} from 'firebase/database';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import not from '../assets/notfound.gif';
import {onAuthStateChanged} from 'firebase/auth'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from "react-helmet";

const Home = () => {
    const navigate = useNavigate()
    const [books,setBooks] = useState([])
    const [spinner,setSpinner] = useState(false)
    let userName
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(!user){
                navigate('/',{replace:true})
            }else{
                userName = user.email
            }
        })
        getBooks()
        setSpinner(false)
    },[])
    console.log(userName)

    async function getBooks(){
        setSpinner(true)
        const look = ref(db,'Books/');
        onValue(look,(snapshot)=>{
            setBooks(snapshot.val());
        })
        console.log(books)
    }    
    return ( 
        <>
        <Helmet>
            <title>Bookkart-Home</title>
        </Helmet>
            <Navbar />
            {spinner === true ? <div id="target">
                    <FontAwesomeIcon icon={faSpinner} />
                </div>:null}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {books.length !== 0 ? books.map((book)=>(
                        <>
                        <Link to={`/books/${book.id}`} className='flex justify-center items-center mb-3 mt-1'>
                        <div class="p-4 w-80 h-96 flex flex-col justify-start items-center bg-white bg-opacity-20 rounded-xl">
                                <img src={book.image} alt="book-kart" class="w-[300px] rounded"/>
                                <h1 class="text-xl font-bold">{book.title}</h1>
                                <p class="ml-16 mb-2 font-semibold">-{book.author}</p>
                                <button class="w-full bg-gray-600 color-white mt-4 h-9 rounded-lg cursor-pointer hover:bg-gray-500">Take Book</button>
                            </div>
                        </Link>
                        </>
                    )):
                    <div className='flex flex-col justify-center items-center'>
                        <img src={not} alt='' className='container w-[60%]'/>
                        <div className='text-2xl font-bold'>No Books Are available</div>
                    </div>
                    }
                </div>
        </>
     );
}
 
export default Home;
