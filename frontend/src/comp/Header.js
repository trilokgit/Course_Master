import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    const userLoginStatus = localStorage.getItem("userLoginStatus");


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="#">Course Master</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" style={{ marginLeft: "700px" }} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/all-courses">Courses</Link>
                        </li>

                        {
                            !userLoginStatus && !teacherLoginStatus ? <>  <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">Teacher</Link>
                                <ul className="dropdown-menu">
                                    {teacherLoginStatus !== 'true' &&
                                        <>
                                            <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                            <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                                        </>
                                    }


                                    {teacherLoginStatus === 'true' &&
                                        <>
                                            <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                                            <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                                        </>

                                    }
                                </ul>
                            </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">User</Link>
                                    <ul className="dropdown-menu">
                                        {userLoginStatus !== 'true' &&
                                            <>
                                                <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                                                <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                                            </>

                                        }
                                        {userLoginStatus === 'true' &&
                                            <>
                                                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                                                <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                                            </>

                                        }
                                    </ul>
                                </li></> : <>
                                {
                                    userLoginStatus === 'true' ?
                                        <>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">User</Link>
                                                <ul className="dropdown-menu">
                                                    {userLoginStatus !== 'true' &&
                                                        <>
                                                            <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                                                            <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                                                        </>

                                                    }
                                                    {userLoginStatus === 'true' &&
                                                        <>
                                                            <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                                                            <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                                                        </>

                                                    }
                                                </ul>
                                            </li>
                                        </> :
                                        <>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">Teacher</Link>
                                                <ul className="dropdown-menu">
                                                    {teacherLoginStatus !== 'true' &&
                                                        <>
                                                            <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                                            <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                                                        </>
                                                    }


                                                    {teacherLoginStatus === 'true' &&
                                                        <>
                                                            <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                                                            <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                                                        </>

                                                    }
                                                </ul>
                                            </li>
                                        </>
                                }
                            </>
                        }




                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header