import { useEffect,useState } from "react";
import Navbar from "./navbar";
import { auth,db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {ref,onValue,get,child} from 'firebase/database';
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
            }else{
                navigate('/',{replace:true})
            }
        })
    },[])
    return ( 
        <div>
            <Helmet>
                <title>
                    Bookkart-My Books
                </title>
            </Helmet>
            <Navbar />
            <div className=' flex justify-center items-center'>
                <button onClick={()=>{
                    const dbRef = ref(db);
                    onValue(ref(db,`${uiid}/`),snapshot =>{
                        setMyBooks([])
                        const data = snapshot.val()
                        if(data !== null){
                            Object.values(data).map(book => {
                                setMyBooks((oldArray)=>[book])
                            })
                        }else {
                            setMyBooks("no data")
                        }
                    })
                }}
                    className=' w-72 bg-gray-600 p-2 text-white text-xl font-extrabold rounded-xl mt-2'
                >Take a look at My Books</button>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {myBooks !=="no data" ? myBooks.map((book)=>(
                    <Link to={`/return/${book.id}`} className='flex justify-center items-center mb-3 mt-1'>
                        <div className="p-4 w-80 h-96 flex flex-col justify-start items-center bg-white bg-opacity-20 rounded-xl">
                            <img src={book.img} alt="book-kart" className="w-[300px] rounded"/>
                            <h1 className="text-xl font-bold">{book.title}</h1>
                            <p className="ml-16 mb-2 font-semibold">-{book.author}</p>
                            <button className="w-full bg-gray-600 color-white mt-4 h-9 rounded-lg cursor-pointer hover:bg-gray-500">Take Book</button>
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