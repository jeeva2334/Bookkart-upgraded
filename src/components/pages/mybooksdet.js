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
                        <div className="container mt-20 p-7 flex flex-col justify-start items-start ">
                            <div className="flex md:flex-row-reverse flex-col mt-5">
                                <div>
                                    <h1 className="text-3xl font-bold">{books.title}</h1>
                                    <p className="ml-16 mt-4 text-gray-100 font-semibold">by {books.author}</p>
                                </div>
                                <img src={books.image} alt={books.title} className="mr-4 w-60 rounded-md" />
                            </div>
                            <p className="mt-5">{books.description}</p>
                        </div>
                    </>
                }
                <div className="w-full flex flex-col justify-center items-end">
                    <p>Returning book?</p>
                    <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={click} id="returnBtn">Return-Book</button>
                </div>
            </div>
        </div>
     );
}
 
export default MyBooksDetails;