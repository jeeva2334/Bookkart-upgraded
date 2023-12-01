import {ref,onValue} from 'firebase/database';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import not from '../assets/notfound.gif';
import {onAuthStateChanged} from 'firebase/auth'
import { Helmet } from "react-helmet";

const Home = () => {
    const navigate = useNavigate()
    const [uiid,setUid] = useState('')
    const [myBooks,setMyBooks] = useState([])
    const [quant,setQuant] = useState(1)
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
            }else{
                navigate('/',{replace:true})
            }
        })
        getBooks()
        setIsLoading(false)
    },[])
    async function getBooks(){
        setIsLoading(true)
        const dbRef = ref(db);
        onValue(ref(db,`Books/`),snapshot =>{
            setMyBooks([])
            const data = snapshot.val()
            if(data !== null){
                Object.values(data).map(book => {
                    if (book === "") return
                    setMyBooks((oldArray)=>[...oldArray,book])
                })
            }else {
                setMyBooks("no data")
            }
        })
        setIsLoading(false)
    }

    return ( 
        <div>
            <Helmet>
                <title>
                    Bookkart-My Books
                </title>
            </Helmet>
            <Navbar />
            <div className=' flex justify-center items-center'>
                <h1 className='mt-3 mb-3 text-2xl font-bold'>Bookkart</h1>
            </div>
            {isLoading === true ? <div className='h-screen mb-20 flex justify-center items-center'>
                {/* <FontAwesomeIcon icon={faSpinner} className='animate-spin text-white text-5xl' /> */}
                Loading ....
            </div>:null}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 p-5">
                {myBooks !=="no data" ? myBooks?.map((book)=>(
                    <Link to={`/books/${book.id}`} className='relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72'  key={book.id} id={`card${book.id}`}>
                        {/* <div className="p-4 w-80 h-96 flex flex-col justify-start items-center bg-white bg-opacity-20 rounded-xl">
                            <img src={book.image} alt="book-kart" className="w-[200px] rounded"/>
                            <h1 className="text-xl font-bold">{book.title}</h1>
                            <p className="ml-16 mb-2 font-semibold">-{book.author}</p>
                            <button className="w-full bg-gray-600 color-white mt-4 h-9 rounded-lg cursor-pointer hover:bg-gray-500">Take Book</button>
                        </div> */}
                        <div
                            className="relative  mx-4 -mt-6 overflow-hidden h-60 text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                            <img
                            src={book.image}
                            alt="card-image" />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 h-1/2">
                                {book.title}
                            </h5>
                            <p className="ml-16 mb-2 text-gray-400 font-semibold">by {book.author}</p>
                        </div>
                        <div className="p-6 pt-0">
                            <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button">
                                Take Book
                            </button>
                        </div>
                    </Link>
                    )
                ):<div className="flex flex-col justify-center items-center text-2xl text-white mt-7 font-bold">
                        <img src={not} alt='' />
                        <h1>You Haven't took any books</h1>
                    </div>}
            </div>
        </div>
     );
}
 
export default Home;
