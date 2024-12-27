import { createContext,useContext,useState } from "react"
export const WishItemsList=createContext();
import { userValid } from "./User";
import { useEffect } from "react";
function Wishitems({children}) {
    const {usernow,setUsernow}=useContext(userValid);
    const [wishitems,setwishitems]=useState([])
    useEffect(() => {
        if (usernow?.id) {
          fetch(`http://localhost:3000/wishlist?userId=${usernow.id}`)
            .then(res => res.json())
            .then(items => {
              setwishitems(items)
            })
            .catch(err => console.log(err));
        }
      }, [usernow]);
  return (
    <WishItemsList.Provider value={{wishitems,setwishitems}}>
        {children}
    </WishItemsList.Provider>
  )
}

export default Wishitems