import React, { useState } from "react";
import Banner from "../components/Banner";
import Jobs from "../Pages/Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import { BASE_URL } from '../config';



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  

  //console.log(jobs)

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data || jobs);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter((job) => job.jobTitle?.toLowerCase().indexOf(query.toLowerCase()) !== -1);  //chaining will fix the error 


  //Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  //main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }
    
    console.log(filteredJobs)

    //category filtering
    if (selected) {
      console.log(filteredJobs)
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          CTC,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => 
          
           
            jobLocation?.toLowerCase() === selected.toLowerCase() ||
            parseInt(CTC) <= parseInt(selected) ||
            postingDate >= selected ||
            salaryType?.toLowerCase() === selected.toLowerCase(0) ||
            experienceLevel?.toLowerCase() === selected.toLowerCase() ||
            employmentType?.toLowerCase() === selected.toLowerCase()
        
        
      );
    }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card data={data} key={i} />);
  };
  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className=" md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          {" "}
          <Sidebar handleChange={handleChange} handleClick={handleClick} />{" "}
        </div>

        {/* job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length}Jobs</h3>
              <p>No data found!</p>
            </>
          )}

          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage == 1} className="hover:underline">Previous</button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              {/* <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length/itemsPerPage)}>Next</button> */}
              <button className="hover:underline" onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length/itemsPerPage)} >Next</button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bg-white p-4 rounded"><Newsletter/></div>
        
        
      </div>
      
    </div>
  );
};

export default Home;
