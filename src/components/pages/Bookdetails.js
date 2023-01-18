import {ref,onValue} from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';
import { useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { set} from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import Navbar from './navbar';
import { Helmet } from "react-helmet";


const BooksDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [books,setBooks] = useState([])
    const [uiid,setUid] = useState()
    const [spinner,setSpinner] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
            }else{
                navigate('/',{replace:true})
            }
        })
        getBook()
        setSpinner(false)
    },[])
    const click = async ()=>{
        console.log(books)
        try {
            await set(ref(db,`${uiid}/${id}`),{
                author:books.author,
                description:books.description,
                id:books.id,
                img:books.image,
                quant:books.quant,
                title:books.title
            })
            await set(ref(db, `Books/${id}/quant`),0,{});
            await set(ref(db,'value'),1);
            navigate('/open',{replace:true})
          } catch (error) {
            console.log("ERROR", error.message);
          }
    }
    async function getBook(){
        setSpinner(true)
        const look = ref(db,'Books/'+id);
        onValue(look,(snapshot)=>{
            setBooks(snapshot.val());
        })
    }
    return ( 
        <div className='container'>
            <Navbar />
            <div className='p-4 justify-start items-center'>
                {
                    spinner === true ? <div id="target">
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>:null
                }
                {books &&
                    <>
                    <Helmet>
                        <title>Bookkart-{`${books.title}`}</title>
                    </Helmet>
                        <div className="container mt-20 p-7 flex flex-col justify-start items-center">
                            <h1 className="text-3xl font-bold">{books.title}</h1>
                            <img src={books.image} alt={books.title} className="mt-5" />
                            <p className="mt-5">{books.description}</p>
                        </div>
                    </>
                }
                {books.quant === 1?<div className="w-full flex flex-col justify-center items-end">
                        <p>Peaked your intrest ?</p>
                        <button className="mt-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500" onClick={click}>Take-Book</button>
                    </div>:<div className="w-full flex flex-col justify-center items-end">
                        <p>Peaked your intrest ?</p>
                        <button className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500" onClick={()=>alert("Book has been taken")}>Book has been taken</button>
                    </div>}
            </div>
        </div>
     );
}
 
export default BooksDetails;
