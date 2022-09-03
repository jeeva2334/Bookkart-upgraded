import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',password:''
    })

    const handleChange = (event)=>{
        setFormData(prevData=>{
          return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }

    const Submit =async ()=>{
        try {     
            const user = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            console.log(user)
            alert("User logged in succesfully")
            navigate('/home',{replace:true})
        } catch (error) {
            alert(error.message)
        }
    }

    return ( 
        <div className="w-screen h-screen">
            <div className="w-screen h-72 bg-blue-500 rounded-b-lg">
                <h1 className="flex justify-center items-end h-72 font-extrabold text-white text-5xl">Book Kart</h1>
            </div>
            <div className="flex justify-center items-center mt-14">
                <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" onChange={handleChange}  required />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} required />
                        </div>
                        <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={Submit}>Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Login;