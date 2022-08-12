import React from 'react'
import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
  return (
      <div className="card">
          <h5 className="card-header"><Link to="/teacher-dashboard">Teacher Dashboard</Link></h5>
          <div className="list-group list-group-flush">
              <Link to="/teacher-courses" className="list-group-item list-group-item-action">My Courses</Link>
              <Link to="/my-students" className="list-group-item list-group-item-action">My Students</Link>
              <Link to="/add-course" className="list-group-item list-group-item-action">Add Course</Link>
              <Link to="/teacher-profile-settings" className="list-group-item list-group-item-action">Profile Settings</Link>
              <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
              <Link to="/teacher-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>

          </div>
      </div>
  )
}

export default TeacherSidebar;