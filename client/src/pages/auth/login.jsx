import CommonForm from "@/components/common/form"
import { loginFormControls} from "@/config"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/store/auth-slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const initialState = {
  email : '',
  password : ''
}

function AuthLogin() {
  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const {toast} = useToast()
  const [count, setcount] = useState(1)


  useEffect(() => {
    const timer = setTimeout(() => {
      setcount(prevCount => (prevCount === 5 ? 1 : prevCount + 1));
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [count]);



  function onSubmit(event){
    event.preventDefault()
    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success)
      {
        toast({
          title : data?.payload?.message
        })
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
        <h1 className="text-3xl font-bold tracking-tight text-gray-200">Sign in to your account</h1>
      </div>
      <CommonForm
      formControls={loginFormControls}
      buttonText={'Sign in'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
      <div className="text-center">
        <p className="mt-2">Don&#39;t have an account
          <Link to='/auth/register' className="font-medium ml-2 text-gray-300 hover:underline hover:text-white">Register Here</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthLogin