import { Navigate, useLocation } from "react-router-dom"

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); //return the current location or we can say that the current route of that page

  if(location.pathname === '/'){
    if(!isAuthenticated){
      return <Navigate to="/auth/login"/>
    }
    else{
      if(user?.role === "admin"){
        return <Navigate to="/admin/dashboard" />
      }
      else{
        return <Navigate to="/" />
      }
    }
  }

  // agar user authenticated nhi hai and and  user /login ya /registe route par bhi nhi hai to use /auth/login route par bhej do
  if (!isAuthenticated && !(location.pathname.includes("login") || location.pathname.includes("register"))) 
  {
    return <Navigate to='/auth/login'/>
  }


  //agar user authenticated hai ana and vo /login ya /register mein se kisi ek route par hai to user ko shopping view ya admin view par redirect karna hai but hum normal user ko admin panel par nhi bhej sakte to hume ye bhi dhyan rakhna hai jiske pass admin ka access ho vo admin par jaye baki sab shopping view par  -->>  isko check karne k liye hum user role check krege ki vo admin user hai ya nhi
  if(isAuthenticated && (location.pathname.includes("login") || location.pathname.includes("register")))      
  {
    if(user?.role === 'admin' )     // ? ko js mein optional chaining kehte hai iss k help se code crash hone se bach jata hai vo aise jab koi user ka role empty hoga to code crash kar jaega but optional chaining(?) code crash nhi karne dega balki undefined return kar dega 
    {
      return <Navigate to="/admin/dashboard"/>
    }
    else{
      return <Navigate to="/"/>      
    }
  }

  
  // agar user authenticated hai or vo admin panel par jane ki kosish kar rha hai and vo admin route par hai but vo admin nhi hai to use /unAuthPage par redirect kar do
  if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes("admin"))    
  {
    return <Navigate to="/unAuthPage"/>
  }


  // agar user authenticated and admin hai or vo /shop page par hai to use admin dashboard par bhej do
  if(isAuthenticated && user?.role === 'admin' && location.pathname.includes("shop"))
  {
    return <Navigate to="/auth/dashboard"/>
  }


  // agar upar vali conditions false ho jae to children render kra do
  return <>{children}</>

}

export default CheckAuth