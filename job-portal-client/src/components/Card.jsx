import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';

const Card = ({ data }) => {
  const { companyName, jobTitle, companyLogo, CTC, salaryType, jobLocation, employmentType, description, postingDate, _id } = data;
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <section className='card bg-white rounded-lg shadow-md p-6 w-full transition-transform transform hover:scale-105'>
      <div className="flex items-center mb-4">
        <span className="bg-green-500 text-white rounded-md px-2 py-1 text-sm"> Actively Hiring</span>
      </div>

      <Link to={`/job-detail/${_id}`} className='flex items-start gap-4 flex-col sm:flex-row'>
        <img src={companyLogo} alt={companyName} className='w-16 h-16 object-cover rounded-full' />

        <div className='mt-4 sm:mt-0 sm:ml-4'>
            {console.log(companyName)}
          <h4 className='text-primary text-2xl font-semibold mb-2'>{companyName}</h4>
          <h3 className='text-xl font-semibold mb-2'>{jobTitle}</h3>

          <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-4'>
            <InfoItem icon={<FiMapPin />} text={jobLocation} />
            <InfoItem icon={<FiClock />} text={employmentType} />
            <InfoItem icon={<FaHome />} text='Work From Home' />
            <InfoItem icon={<FiCalendar />} text={formatDate(postingDate)} />
          </div>

          <div className='flex items-center gap-2 text-lg'>
            <LiaFileContractSolid />
            <span className="flex items-center">
              <span className="text-gray-600 mr-1"> CTC </span>
              <FaRupeeSign className='text-xl' />
              <span className="text-primary font-semibold">{CTC} {salaryType}</span>
            </span>
          </div>

          <button className='btn-primary mt-6 px-8 py-2 bg-blue hover:bg-primary-dark text-white font-semibold rounded-md transition duration-300 ease-in-out'>
            View Details
          </button>
        </div>
      </Link>
    </section>
  );
};

const InfoItem = ({ icon, text }) => (
  <span className='flex items-center gap-2'>
    {icon}
    {text}
  </span>
);

export default Card;
