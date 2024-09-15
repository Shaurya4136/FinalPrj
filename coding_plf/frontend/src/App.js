import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import OptPageSignin from './pages/OptpageSignin.js';
import LoginRegisterPageCollege from './pages/LoginRegisterpageCollege.js';
import LoginRegisterPageStudent from './pages/LoginRegisterpageStudent.js'; // This should be for student login
import LoginRegisterpageClub from './pages/LoginRegisterpageClub.js';
import StudentCommunity from './pages/StudentProfile/StudentCommunity.js';
import StudentProfile from './pages/StudentProfile/StudentProfile.js';
import StudentQuestions from './pages/StudentProfile/StudentsQuestion.js';
import StudentNavbar from './components/StudentNavbar.js';
import ClubCommunity from './pages/ClubHeadProfile/ClubCommunity.js';
import ClubProfile from './pages/ClubHeadProfile/ClubProfile.js';
import ClubPostPage from './pages/ClubHeadProfile/ClubPost.js';
import CollegeNavbar from './components/CollegeNavbar.js';
import CollegeCommunity from './pages/CollegeProfile/CollegeCommunite.js'
import CollegeProfile from './pages/CollegeProfile/CollegeProfile.js';
import CollegePostPage from './pages/CollegeProfile/CollegePost.js';
import Collegepassword from './pages/CollegeProfile/Collegepassword.js';

const App = () => {
  return (
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<OptPageSignin />} />
          <Route path="/Login" element={<OptPageSignin />} />
          <Route path="/CollegeLoginRegister" element={<LoginRegisterPageCollege />} />
          <Route path="/StudentLoginRegister" element={<LoginRegisterPageStudent />} /> {/* Render the Student login page */}
          <Route path="/ClubHeadLoginRegister" element={<LoginRegisterpageClub />} />
          <Route path="/optpagesignin-Login" element={<StudentCommunity />} />
          <Route path="/student-community" element={<StudentCommunity />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-Questions" element={<StudentQuestions />} />
          <Route path="/club-community" element={<ClubCommunity />} />
          <Route path="/club-profile" element={<ClubProfile />} />
          <Route path="/club-post" element={<ClubPostPage />} />
          <Route path="/club-logout" element={<OptPageSignin />} />
          <Route path="/college-Community" element={<CollegeCommunity/>} />
          <Route path="/college-Profile" element={<CollegeProfile />} />
          <Route path="/college-Post" element={<CollegePostPage />} />
          <Route path="/college-password" element={<Collegepassword />} />
          <Route path="/college-Logout" element={<OptPageSignin />} />

        </Routes>
      </div>
  );
};

export default App;
