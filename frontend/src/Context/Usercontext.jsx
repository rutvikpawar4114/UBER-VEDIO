// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext()

// eslint-disable-next-line react/prop-types
const Usercontext = ({children}) => {

  const [user , setUser] =  useState({
    email :'',
    fullname:{
      firstName:'',
      lastName:''
    }
  })
  return (
    <div>
     < UserDataContext.Provider value={[user , setUser]}>
      {children}
     </UserDataContext.Provider>
    </div>
  )
}

export default Usercontext
