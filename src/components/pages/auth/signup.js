import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth,db } from "../../firebase/firebase-config";
import { ref, set} from "firebase/database";
import { validEmail, validPassword } from "./regex";
import { Helmet } from "react-helmet";

const SignUp = () => {

    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth,user=>{
            if(user){
                navigate("/home",{replace:true})
            }
        })
    }, [])
    
    const [formData,setFormData] = useState({
        fullname:'',phoneno:'',email:'',password:'',confirmPassword:''
    })

    const [page,setPage] = useState(0)

    const handleChange = (event)=>{
        setFormData(prevData=>{
          return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }

    const Submit = async () =>{
        if(formData.fullname === '',formData.phoneno === '',formData.email === '',formData.password === '',formData.confirmPassword === ''){
            alert("All feilds are required")
        }else if(!validEmail.test(formData.email)){
            alert("Enter an valid email")
        }else if(!validPassword.test(formData.password)){
            alert("password is not strong")
        }else if(formData.password !== formData.confirmPassword){
            alert("Password not matching")
        }else if(formData.phoneno.length < 10 || formData.phoneno.length >10){
            alert("enter a valid phoneno")
        }else{
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                const body={
                    fullname:formData.fullname,
                    phoneno:formData.phoneno,
                    email:formData.email
                }
                await set(ref(db, `users/${user.user.uid}`),body,{});
                alert("User created succesfully")
                navigate('/',{replace:true})
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return ( 
        <div>
            <Helmet>
                <title>BOokkart-signup</title>
            </Helmet>
            <div className="h-screen">
                <div className="h-16 bg-black flex justify-start items-center p-4">
                    <h1 className="flex justify-start items-center font-extrabold text-white text-xl">Book Kart</h1>
                </div>
                <div className="container p-2 h-[80vh] flex justify-center items-center mt-1">
                    <div className="p-4 w-full max-w-sm bg-white bg-opacity-70 rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" action="#">
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up into bookkart</h5>
                            {page === 0 ?
                            <>
                                <div>
                                    <label for="Fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                                    <input type="text" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Full name" onChange={handleChange} value={formData.fullname}  required />
                                </div>
                                <div>
                                    <label for="Phone no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone no</label>
                                    <input type="number" name="phoneno" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Phone No" onChange={handleChange} value={formData.phoneno}  required />
                                </div>
                                <div className="flex justify-end items-center">
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setPage(1)}>Next</button>
                                </div>
                            </>
                            :<>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" onChange={handleChange} value={formData.email}  required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} value={formData.password} required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} value={formData.confirmPassword} required />
                                </div>
                                <div className="flex justify-between">
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setPage(0)}>Previous</button><button type="button" className="w- text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={Submit}>Sign-up to your account</button>
                                </div>
                            </>}
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Have an Account? <Link to="/" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;