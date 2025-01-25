import React from 'react'
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import "../App.css";
import { BASE_URL } from '../config';


const UpdateJob = () =>{
    const {id} = useParams();
    const [jobDetails, setJobDetails] = useState({});
    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    useEffect(() => {
        // Fetch job details when the component mounts
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get-job/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token for authentication
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }

                const data = await response.json();
                setJobDetails(data);  // Set the fetched job details in state
                reset(data)
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchJobDetails();
    }, [id]);


    const { companyName, jobTitle, CTC, salaryType, jobLocation, postingDate, jobType, companyLogo, employmentType, description,
    postedBy, experienceRequired, applyBy, salaryDetails, aboutCompany, workArrangement, skillsRequired } = jobDetails;

    
    
    const [selectedOption, setSelectedOption] = useState(null);
  

  const onSubmit = (data) => {
    const token = localStorage.getItem('token')
    console.log(data)
    
    axios.put(`${BASE_URL}/update-job/${id}`, data, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
    })
      .then(response =>{
        console.log(response);
        alert("Job Updated Successfully");
        reset();
      })
      .catch(error =>{
        console.error(error.message);
      })
  }

  const options = [
    {value : "JavaScript", label: "JavaScript"},
    {value : "C++", label: "C++"},
    {value : "HTML", label: "HTML"},
    {value : "CSS", label: "CSS"},
    {value : "React", label: "React"},
    {value : "Node", label: "Node"},
    {value : "MongoDB", label: "MongoDB"},
    {value : "Redux", label: "Redux"},
  ]

  return (
    <div className="max-w-screen-2xl container mx-auto x1:px-24 px-4">
      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={companyName}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Annual CTC</label>
              <input
                type="number"
                placeholder="₹800000"
                defaultValue={CTC}
                {...register("CTC")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Last Date To Apply</label>
              <input
                type="date"
                placeholder="Ex : 2023-11-03"
                defaultValue={applyBy}
                {...register("applyBy")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType",)} className='create-job-input'>
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex : Pune"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Type</label>
              <select {...register("jobType",)} className='create-job-input'>
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Required</label>
              <input
                type="text"
                placeholder="Ex : 0-2 years"
                defaultValue={experienceRequired}
                {...register("experienceRequired")}
                className="create-job-input"
              />
            </div>
            
          </div>
          <div className="create-job-flex"> 
          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Work Arrangement</label>
              <select {...register("workArrangement")} className='create-job-input'>
                  <option value="Work from home">Work from home</option>
                  <option value="On site">On site</option>
              </select>
          </div>

          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
            defaultValue={skillsRequired}
            onChange={setSelectedOption}
            options={options}
            isMulti
            className="create-job-input py-4"/>
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo url : https://weshare.com/jpeg1"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select {...register("employmentType",)} className='create-job-input'>
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value='Temporary'>Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
          <label className="block mb-2 text-lg">Job Description</label>
          <textarea className="w-full pl-3 py-1.5 focus:outline-none" rows={6}
          placeholder="Job Description"
          defaultValue={description}
          {...register("description")} />
          </div>

          {/* 8th row */}
          <div className="w-full">
          <label className="block mb-2 text-lg">Salary Details</label>
          <textarea className="w-full pl-3 py-1.5 focus:outline-none" rows={6}
          placeholder="Salary Details"
          defaultValue={salaryDetails}
          {...register("salaryDetails")} />
          </div>

          {/* 9th row */}
          <div className="w-full">
          <label className="block mb-2 text-lg">About Company</label>
          <textarea className="w-full pl-3 py-1.5 focus:outline-none" rows={6}
          placeholder="Company Information"
          defaultValue={aboutCompany}
          {...register("aboutCompany")} />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="youremail@gmail.com"
                  defaultValue={postedBy}
                  {...register("postedBy")}
                  className="create-job-input"  
            />
          </div>
          <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
        </form>
      </div>
    </div>
  )
}

export default UpdateJob;