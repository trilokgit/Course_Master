import React from 'react'

const UserLogout = () => {
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "user-login";
  return (
    
      <>
          
      </>
      
  )
}

export default UserLogout;