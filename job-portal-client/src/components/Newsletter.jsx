import React from "react";
import { FaEnvelope, FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const Newsletter = () => {
  return (
    <div>
        {/* 1st part */}
      {/* <div>
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <FaEnvelopeOpenText />
        Email me for jobs
      </h3>
      <p></p> 

      <div className="w-full space-y-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@gmail.com"
          className="w-full block  py-2 pl-3 border focus:outline-none"
        />
        <input
          type="submit"
          value="Subscribe"
          className="w-full block  py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
        />
      </div> 
      </div> */}
      {/* 2nd part */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <FaRocket />
            Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
        Upload your resume today to showcase your skills and experience to top recruiters. Let your dream job find you!
        </p>

        <div className="w-full space-y-4">
            <input
            type="submit"
            value="Upload your resume"
            className="w-full block  py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
            />
        </div> 
      </div>
    </div>
  );
};

export default Newsletter;
