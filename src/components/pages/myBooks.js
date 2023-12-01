import { useEffect,useState } from "react";
import Navbar from "./navbar";
import { auth,db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {ref,onValue} from 'firebase/database';
import not from '../assets/notfound.gif';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyBooks = () => {
    const navigate = useNavigate()
    const [uiid,setUid] = useState('')
    const [myBooks,setMyBooks] = useState([])
    const [quant,setQuant] = useState(1)
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
                onValue(ref(db,`${user.uid}/`),snapshot =>{
                    setMyBooks([])
                    const data = snapshot.val()
                    console.log(data)
                    if(data !== null){
                        let bookArr = []
                        Object.values(data).map(book => {
                            bookArr.push(book)
                        })
                        setMyBooks(bookArr)
                        bookArr = []
                    }else {
                        setMyBooks("no data")
                    }
                })
            }else{
                navigate('/',{replace:true})
            }
        })
    },[])
    async function getBooks(){
        onValue(ref(db,`${uiid}/`),snapshot =>{
            setMyBooks([])
            const data = snapshot.val()
            if(data !== null){
                Object.values(data).map(book => {
                    setMyBooks((oldArray)=>[...oldArray,book])
                })
            }else {
                setMyBooks("no data")
            }
        })
    }
    return ( 
        <div>
            <Helmet>
                <title>
                    Bookkart-My Books
                </title>
            </Helmet>
            <Navbar />
            <h1 className="text-center mt-4 font-semibold text-2xl">My Books</h1>
            <div className="p-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {myBooks !=="no data" ? myBooks.map((book)=>(
                    <Link to={`/return/${book.id}`} className='relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72' key={book.id}>
                        <div
                            className="relative  mx-4 -mt-6 overflow-hidden h-60 text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                            <img
                            src={book.img}
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
                                Return Book
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
 
export default MyBooks;