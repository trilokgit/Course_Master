import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
      <div className="card">
          <h5 className="card-header"><Link to="/user-dashboard">Dashboard</Link></h5>
          <div className="list-group list-group-flush">
              <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
              <Link to="/my-classwork" className="list-group-item list-group-item-action">My Classwork</Link>
              <Link to="/favorite-courses" className="list-group-item list-group-item-action">Favorite Courses</Link>
              <Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
              <Link to="/profile-settings" className="list-group-item list-group-item-action">Profile Settings</Link>
              <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
              <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
          </div>
      </div>
  )
}

export default Sidebar;