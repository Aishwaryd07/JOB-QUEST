import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home.jsx'
import PostJob from '../Pages/PostJob.jsx';
import MyJobs from '../Pages/MyJobs.jsx';
import Signup from '../Pages/Signup.jsx';
import SetPassword from '../components/SetPassword.jsx';
import Login from '../Pages/Login.jsx';
import JobDetail from '../Pages/JobDetail.jsx';
import UpdateJob from '../Pages/UpdateJob.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home/>} />
          <Route path='/post-job' element={<PostJob/>}/>
          <Route path='/my-job' element={<MyJobs/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path="/set-password" element={<SetPassword/>} />
          <Route path="/job-detail/:id" element={<JobDetail/>} />
          <Route path="/edit-job/:id" element={<UpdateJob/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
