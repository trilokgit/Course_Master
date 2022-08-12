import React from 'react'

const TeacherLogout = () => {
    localStorage.removeItem("teacherLoginStatus");
    localStorage.removeItem("teacherId");
    localStorage.removeItem("teacherName");
    window.location.href = "teacher-login";
  return (
    
      <>
          
      </>
      
  )
}

export default TeacherLogout