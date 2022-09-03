import { useEffect,useState } from "react";
import Navbar from "./navbar";
import { auth,db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {ref,onValue,get,child} from 'firebase/database';
import not from '../assets/notfound.gif';
import { uid } from "uid";

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
    console.log(uid)
    return ( 
        <div>
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
                            console.log(myBooks);
                        }else {
                            setMyBooks("no data")
                        }
                    })
                }}
                    className='w-96 bg-blue-500 p-2 text-white text-xl font-extrabold rounded-xl mt-2'
                >Take a look at My Books</button>
            </div>
            {myBooks !=="no data" ? myBooks.map((books)=>{
                return(
                <div>
                    <div className="flex justify-center items-center mt-5">
                        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg" src={books.img} alt="" />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{books.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{books.author}</p>
                                <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{navigate(`/return/${books.id}`,{replace:true})}}>
                                    Return Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }):<div className="flex flex-col justify-center items-center text-2xl text-red-400 font-bold">
                    <img src={not} alt='' />
                    <h1>You Haven't took any books</h1>
                </div>}
        </div>
     );
}
 
export default MyBooks;