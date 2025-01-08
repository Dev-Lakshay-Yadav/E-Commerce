import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/store/auth-slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const initialState = {
  userName: '',
  email: '',
  password: ''
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
    const [count, setcount] = useState(1)
  
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setcount(prevCount => (prevCount === 5 ? 1 : prevCount + 1));
      }, 1000);
  
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [count]);

  function onSubmit(event) {
    event.preventDefault()         //taki page refresh na ho form submit hone par
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
        navigate("/auth/login")
      }
      else
      {
        toast({
          title : data?.payload?.message,
          variant : "destructive"
        })
      }
    })
  }

  return (
    <div className={`mx-auto w-full max-w-md space-y-6 bg-gray-700 border-2 border-gray-200 border-opacity-20 rounded-[2vw] p-[3vw] shadow-chart-${count} shadow-2xl`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-200">Create new account</h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
       <div className="text-center">
        <p className="mt-2">Already have an account
          <Link to='/auth/login' className="font-medium ml-2 text-gray-300 hover:underline hover:text-white">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthRegister