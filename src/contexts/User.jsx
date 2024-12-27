import { createContext,useState} from 'react'
export const userValid=createContext()
function User({children}) {
    const [usernow,setUsernow]=useState({})
  return (
    <userValid.Provider value={{usernow,setUsernow}}>
        {children}
    </userValid.Provider>
  )
}

export default User