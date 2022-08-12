import React from 'react'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import About from './About'
import CourseDetail from './CourseDetail'
import Login from './user/Login'
import Register from './user/Register'
import Dashboard from './user/Dashboard'

import Mycourses from './user/Mycourses'
import { Routes,Route } from 'react-router-dom'
import FavoriteCourses from './user/FavoriteCourses'
import RecommendedCourses from './user/RecommendedCourses'
import ProfileSettings from './user/ProfileSettings'
import TeacherDetail from './TeacherDetail'

// Teacher
import LoginTeacher from './teacher/LoginTeacher'
import RegisterTeacher from './teacher/RegisterTeacher'
import DashboardTeacher from './teacher/DashboardTeacher'
import Teachercourses from './teacher/Teachercourses'
import MyStudents from './teacher/MyStudents'
import AddCourse from './teacher/AddCourse'
import TeacherProfileSettings from './teacher/TeacherProfileSettings'
import TeacherChangePassword from './teacher/TeacherChangePassword'
import TeacherLogout from './teacher/TeacherLogout'
import AddChapters from './teacher/AddChapters'
import CourseChapters from './teacher/CourseChapters'
import EditChapter from './teacher/EditChapter'
import EditCourse from './teacher/EditCourse'
import TeacherSkillCourses from './teacher/TeacherSkillCourses'
import EnrolledStudents from './teacher/EnrolledStudents'
import AddAssignment from './teacher/AddAssignment'
import Assignments from './teacher/Assignments'
import ChangePassword from './user/ChangePassword'
import ResetPassword from './teacher/ResetPassword'


import AllCourses from './AllCourses'
import PopularCourses from './PopularCourses'
import PopularTeacher from './PopularTeacher'
import CategoryCourses from './CategoryCourses'
import NotFound from './NotFound'
import UserLogout from './user/UserLogout'
import MyClasswork from './user/MyClasswork'


const Main = () => {
  return (
   
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/detail/:course_id" element={<CourseDetail />} />
          <Route exact path="/user-login" element={<Login />} />
          <Route exact path="/user-register" element={<Register />} />
        <Route exact path="/user-dashboard" element={<Dashboard />} />
        <Route exact path="/my-classwork" element={<MyClasswork />} />
        <Route exact path="/teacher-login" element={<LoginTeacher />} />
        <Route exact path="/teacher-register" element={<RegisterTeacher />} />
        <Route exact path="/teacher-dashboard" element={<DashboardTeacher />} />
        <Route exact path="/my-courses" element={<Mycourses />} />
        <Route exact path="/teacher-courses" element={<Teachercourses />} />
        <Route exact path="/my-students" element={<MyStudents />} />
        <Route exact path="/favorite-courses" element={<FavoriteCourses />} />
        <Route exact path="/recommended-courses" element={<RecommendedCourses />} />
        <Route exact path="/profile-settings" element={<ProfileSettings />} />
        <Route exact path="/change-password" element={<ChangePassword />} />
        <Route exact path="/add-course" element={<AddCourse />} />
        <Route exact path="/teacher-profile-settings" element={<TeacherProfileSettings />} />
        <Route exact path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route exact path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route exact path="/all-courses" element={<AllCourses />} />
        <Route exact path="/all-chapters/:course_id" element={<CourseChapters />} />
        <Route exact path="/popular-courses" element={<PopularCourses />} />
        <Route exact path="/popular-teacher" element={<PopularTeacher />} />
        <Route exact path="/category-courses/:category_slug" element={<CategoryCourses />} />
        <Route exact path="/teacher-logout" element={<TeacherLogout />} />
        <Route exact path="/user-logout" element={<UserLogout />} />
        <Route exact path="/teacher-skill-courses/:category_slug/:teacher_id" element={<TeacherSkillCourses />} />
        <Route exact path="/add-chapters/:course_id" element={<AddChapters />} />
        <Route exact path="/edit-chapter/:course_id/:chapter_id" element={<EditChapter />} />
        <Route exact path="/edit-course/:course_id" element={<EditCourse />} />
        <Route exact path="/enrolled-students/:course_id" element={<EnrolledStudents />} />
        <Route exact path="/add-assignment/:teacher_id/:student_id/:course_id" element={<AddAssignment />} />
        <Route exact path="/assignments/:teacher_id/:student_id/:course_id" element={<Assignments />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
       </Routes>
        <Footer/>
      </div>
   
  )
}

export default Main