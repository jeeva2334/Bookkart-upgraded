import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth,db } from "../firebase/firebase-config";
import { set,ref,onValue, remove } from "firebase/database";
import Navbar from "./navbar";
import { Helmet } from "react-helmet";


const MyBooksDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const[books,setBooks] = useState([])
    const [uuid,setUid] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUid(user.uid)
            }else{
                navigate('/',{replace:true})
            }
        })
        getBook()
    },[])
    const click = async () =>{
        try {
            await set(ref(db, `Books/${id}/quant`),1,{});
            await remove(ref(db,`${uuid}/${id}`))
            await set(ref(db,'value'),1);
            navigate('/open',{replace:true})
        } catch (error) {
            console.log(
                error.message
            )
        }
    }
    async function getBook(){
        const look = ref(db,'Books/'+id);
        onValue(look,(snapshot)=>{
            setBooks(snapshot.val());
        })
    }
    return ( 
        <div className="container">
            <Navbar />
            <div className="p-4">
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
                <div className="w-full flex flex-col justify-center items-end">
                    <p>Returning book?</p>
                    <button className="mt-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500" onClick={click} id="returnBtn">Return-Book</button>
                </div>
            </div>
        </div>
     );
}
 
export default MyBooksDetails;