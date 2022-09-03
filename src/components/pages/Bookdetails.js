import {ref,onValue} from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { set} from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';


const BooksDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [books,setBooks] = useState([])
    const [quanty,setQuanty] = useState(0)
    const [uiid,setUid] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
            }else{
                navigate('/',{replace:true})
            }
        })
    },[])
    const click = async ()=>{
        console.log(books)
        try {
            await set(ref(db,`${uiid}/${id}`),{
                author:books.author,
                description:books.description,
                id:books.id,
                img:books.img,
                quant:books.quant,
                title:books.title
            })
            await set(ref(db, `Books/${id}/quant`),quanty,{});
            await set(ref(db,'values'),1);
            navigate('/open',{replace:true})
          } catch (error) {
            console.log("ERROR", error.message);
          }
    }
    return ( 
        <>
            <div className="w-screen h-14 flex justify-center items-center bg-blue-400 rounded-b-lg text-white">
                <Link to='/home'>
                     <FontAwesomeIcon icon={faArrowLeftLong} className='ml-2'/>
                 </Link>
                 <div className="w-screen h-14 flex justify-center items-center text-white font-extrabold text-2xl">Book Kart</div>
             </div>
             <div className="flex items-center justify-center ">
                 <button onClick={ ()=>{
                     const look = ref(db,'Books/'+id);
                         onValue(look,(snapshot)=>{
                             setBooks(snapshot.val());
                         })
                     console.log(books)
                 }} className='w-96 bg-blue-500 p-2 text-white text-xl font-extrabold rounded-xl mt-2' >Dont see the Details click me!</button>
             </div>
            {books &&
                <>
                   <div className="h-full w-screen">
                   <div className="text-4xl font-extrabold ml-8">{books.title}</div>
                     <div className="flex justify-center items-center">
                         <img src={books.img} className='rounded-xl mt-5 w-auto h-auto' />
                     </div>
                     <div className="text-xl font-extrabold m-4">
                         <h1>{books.author}</h1>
                     </div>
                     <div className="m-4">
                         <p>{books.description}</p>
                     </div>
                 </div>
                </>
            }
            {books.quant == 1 ?<div className="w-screen flex items-end justify-end mr-9">
                <button className="w-auto bg-blue-500 p-3 pl-6 pr-6 rounded-xl text-white font-bold" onClick={click}>Get Book</button>
            </div>:<div className="w-screen flex items-end justify-end mr-9">
                <button className="w-auto bg-red-500 p-3 pl-6 pr-6 rounded-xl text-white font-bold" onClick={()=>{alert("Sorry Book has been taken!")}}>Book as been taken</button>
            </div>}
        </>
     );
}
 
export default BooksDetails;
