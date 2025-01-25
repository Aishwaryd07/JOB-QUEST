
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { ImOffice } from "react-icons/im";
import { IoBag } from "react-icons/io5";
import { FaRupeeSign } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';
import { BASE_URL } from '../config';


const JobDetail = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);

    const openApplyPopup = () => {
        if(localStorage.getItem('token')) setShowPopup(true);
        else alert('please Login');
      };
    
      const closeApplyPopup = () => {
        setShowPopup(false);
      };

      const handleInputChange = (file) =>{
        if(file) setResume(file);
      }
      const handleSubmit = (file) => {
        try{
            const formData = new FormData();
            formData.append('resumePdf',resume);
            fetch(`${BASE_URL}/resume-upload/${id}`,{
                method: 'POST',
                body: formData,
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                if(response.status === 200){
                    window.alert("You have successfully applied for this job!");
                    closeApplyPopup();
                }
                else if(response.status === 403){
                    window.alert('please Login');
                }
                else{
                    console.error('failed to submit resume');
                }
            })
        }
        catch(error){
            console.error("Error occurred while submitting resume", error);
        }
      }

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      const ApplyPopup = () => {
        const [selectedFile, setSelectedFile] = useState(null);
      
        const handleInputChange = (file) => {
          setSelectedFile(file);
        };

      
        return (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
              <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Upload Your Resume</h2>
              <label className="block text-sm text-gray-600 mb-2">
                Choose a PDF file:
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleInputChange(e.target.files[0])}
                    className="hidden"
                    id="resumeInput"
                  />
                  <label htmlFor="resumeInput" className="cursor-pointer border p-2 w-full">
                    {selectedFile ? selectedFile.name : "Select a file"}
                  </label>
                </div>
              </label>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                  Submit
                </button>
                <button
                  onClick={closeApplyPopup}
                  className="px-6 py-3 border rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get-job/${id}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJob();
    }, [id]);

    const renderTextList = (text) => {
        const points = text.split('\n').filter(point => point.trim() !== '');

        return (
            <ul className="mb-4 list-disc list-inside text-lg">
                {points.map((point, index) => (
                    <li key={index}>{point.trim()}</li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
            {job ? (
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">{job.jobTitle}</h1>
                        <p className="text-lg text-gray-600">{job.companyName}</p>
                    </div>
                    <div className="text-gray-600 mb-4">
                        {job.workArrangement === 'Work from home'?
                        <div className="flex space-x-4 items-center">
                            <InfoItem icon={<FaHome />} text={job.workArrangement} />   
                            <InfoItem icon={<IoBag />} text={job.jobType} />
                        </div> 
                        : 
                        <>
                        <InfoItem icon={<ImOffice />} text={job.workArrangement} />
                        <InfoItem icon={<IoBag />} text={job.jobType} />
                        </>}
                    </div>
                    <div className="text-gray-600 mb-4">
                        <div className="flex space-x-4 items-center">
                        <InfoItem icon={<LiaFileContractSolid />} text='CTC' /><InfoItem icon={<FaRupeeSign />} text={job.CTC +" "+job.salaryType} /> 
                        </div> 
                    </div>
                    <div className="text-gray-600 mb-4">
                         <strong>Experience Required:</strong> {job.experienceRequired}, <strong>Apply By:</strong> {formatDate(job.applyBy)}
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="text-lg text-gray-700 leading-relaxed mb-4">
                            <strong>Job Description:</strong>
                            {renderTextList(job.description)}
                        </div>
                        <div className="text-lg text-gray-700 leading-relaxed mb-4">
                            <strong>Salary Details:</strong>
                            {renderTextList(job.salaryDetails)}
                        </div>
                    </div>

                    <div className="text-gray-600 mb-4">
                        <strong>Job Location:</strong> {job.jobLocation}, <strong>Posting Date:</strong> {new Date(job.postingDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-600 mb-4">
                        <strong>Employment Type:</strong> {job.employmentType}
                    </div>
                    <div className="text-gray-700 mb-4 leading-relaxed mb-4">
                        <strong>About {job.companyName}:</strong> {job.aboutCompany}
                    </div>
                    <div>
                        <strong>Posted By:</strong> {job.postedBy}
                    </div>
                    <div>
                        <button 
                            className='py-2 px-5 border rounded bg-blue text-white'
                            onClick={openApplyPopup}
                        >Apply Now</button>
                    </div>
                    {showPopup && <ApplyPopup/>}
                </div>
            ) : (
                <p className="text-center text-gray-600">Loading...</p>
            )}
        </div>
    );
};

const InfoItem = ({ icon, text }) => (
    <span className='flex items-center gap-2'>
      {icon}
      {text}
    </span>
  );

export default JobDetail;
