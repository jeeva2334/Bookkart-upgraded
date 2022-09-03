import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth,db } from "../firebase/firebase-config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { set,ref,onValue, remove } from "firebase/database";
import { uid } from "uid";


const MyBooksDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const[myBooks,setMyBooks] = useState([])
    const [quant,setQuant] = useState(1)
    const [uuid,setUid] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
            }else{
                navigate('/',{replace:true})
            }
        })
    },[])
    const click = async () =>{
        try {
            await set(ref(db, `Books/${id}/quant`),quant,{});
            await remove(ref(db,`${uuid}/${id}`))
            await set(ref(db,'values'),1);
            alert("Place the book inside safely")
            navigate('/open',{replace:true})
        } catch (error) {
            console.log(
                error.message
            )
        }
    }
    return ( 
        <div>
              <div className="w-screen h-14 flex justify-center items-center bg-blue-400 rounded-b-lg text-white">
                <Link to='/home'>
                     <FontAwesomeIcon icon={faArrowLeftLong} className='ml-2'/>
                 </Link>
                 <div className="w-screen h-14 flex justify-center items-center text-white font-extrabold text-2xl">Book Kart</div>
             </div>
             <div className="flex items-center justify-center ">
                 <button onClick={ ()=>{
                     const look = ref(db,`${uuid}/${id}`);
                         onValue(look,(snapshot)=>{
                             setMyBooks(snapshot.val());
                         })
                     console.log(myBooks)
                 }} className='w-96 bg-blue-500 p-2 text-white text-xl font-extrabold rounded-xl mt-2' >Dont see the Details click me!</button>
             </div>
             {myBooks &&
            <>
               <div className="h-full w-screen">
               <div className="text-4xl font-extrabold ml-8">{myBooks.title}</div>
                 <div className="flex justify-center items-center">
                     <img src={myBooks.img} className='rounded-xl mt-5 w-auto h-auto' />
                 </div>
                 <div className="text-xl font-extrabold m-4">
                     <h1>{myBooks.author}</h1>
                 </div>
                 <div className="m-4">
                     <p>{myBooks.description}</p>
                 </div>
             </div>
            </>
        }
            <div className="w-screen flex items-end justify-end mr-9">
                <button className="w-auto bg-blue-500 p-3 pl-6 pr-6 rounded-xl text-white font-bold" onClick={click}>Return Book</button>
            </div>
        </div>
     );
}
 
export default MyBooksDetails;