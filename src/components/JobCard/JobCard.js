import React, { useState, useEffect } from 'react';
import fetchSampleJdJSON from '../../utils/api.js';
import Filters from '../Filters/Filters.js';
import DescModal from '../DescModal/DescModal.js';
import './JobCard.css';

const JobCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [jobData, setJobData] = useState({ jdList: [] });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(10);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchSampleJdJSON();
        if (!data) {
          setError('Invalid data');
        } else {
          setJobData(data);
          setHasMore(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleFilterChange = (filters) => {
    if (!jobData || !jobData.jdList) {
      return;
    }

    let filteredJobs = jobData.jdList.filter((job) => {
      if (filters.minExp && job.minExp < filters.minExp) return false;
      if (
        filters.companyName &&
        filters.companyName !== '' &&
        job.companyName !== filters.companyName
      )
        return false;
      if (
        filters.location &&
        filters.location !== '' &&
        job.location !== filters.location
      )
        return false;
      if (
        filters.remoteOrOnsite &&
        filters.remoteOrOnsite !== '' &&
        (filters.remoteOrOnsite === 'remote'
          ? job.location !== 'remote'
          : job.location === 'remote')
      )
        return false;
      if (
        filters.jobRole &&
        filters.jobRole !== '' &&
        job.jobRole !== filters.jobRole
      )
        return false;
      if (
        filters.minBasePay &&
        filters.minBasePay !== '' &&
        job.minJdSalary < parseInt(filters.minBasePay, 10)
      )
        return false;
      return true;
    });

    setFilteredJobs(filteredJobs);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const jobsToRender = filteredJobs.length
    ? filteredJobs.slice(0, 10)
    : jobData.jdList.slice(0, currentPage);

  console.log(jobsToRender);

  const loadMoreJobs = async (event) => {
    event.preventDefault();
    try {
      console.log('Fetching next page of jobs...');
      const nextPage = currentPage + 10;
      const response = await fetchSampleJdJSON(nextPage);
      if (!response) {
        console.log('Invalid data');
        setError('Invalid data');
        return;
      }

      console.log('Appending new jobs to jobData...');
      setJobData({ jdList: [...jobData.jdList, ...response.jdList] });
      setHasMore(response.jdList.length > 0);

      if (jobData.jdList.length > 0) {
        setHasMore(true);
      } else {
        setHasMore(false);
        setShowLoadMoreButton(false);
      }
    } catch (error) {
      console.log('Error fetching next page of jobs:', error.message);
      setError(error.message);
    }
    setCurrentPage(currentPage + 10);
  };

  console.log(openModal);

  return (
    <>
      {openModal && (
        <DescModal closeModal={setOpenModal} jobId={selectedJob.jdUid} />
      )}

      <Filters jobData={jobData} onFilterChange={handleFilterChange} />
      <div className="job-card">
        {jobsToRender.map((job) => (
          <div className="job-card-item" key={job.jdUid}>
            <div className="job-card-logo-address">
              {job.logoUrl && (
                <img className="logoUrl" src={job.logoUrl} alt="logo" />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '5px',
                }}
              >
                {job.companyName && (
                  <h2 className="company-name">{job.companyName}</h2>
                )}
                {job.jobRole && <p className="title">{job.jobRole}</p>}
                {job.location && <p className="location">{job.location}</p>}
              </div>
            </div>

            {job.maxJdSalary && job.minJdSalary && (
              <p>
                Estimated Salary: {job.salaryCurrencyCode} {job.maxJdSalary} -{' '}
                {job.minJdSalary} LPA ✅
              </p>
            )}
            <p className="about">About Company:</p>
            {job.jobDetailsFromCompany && (
              <p className="description">
                <p style={{ fontWeight: 'bold', margin: '0' }}>About us</p>
                {job.jobDetailsFromCompany.slice(0, 100)}...
                <br />
              </p>
            )}
            <button
              type="button"
              className="read-more"
              onClick={() => handleJobClick(job)}
            >
              Read More
            </button>
            {job.minExp && job.maxExp && (
              <p className="experience-required">
                Minimum Experience <br />
                {job.minExp} years
              </p>
            )}
            <div className="Btn-area">
              {job.jdLink && (
                <a href={job.jdLink} className="apply-button">
                  ⚡ Easy Apply
                </a>
              )}

              <button className="referral">Unlock referral asks </button>
            </div>
          </div>
        ))}
      </div>
      <div className="load-more">
        {showLoadMoreButton && hasMore && (
          <button className="loading-more-btn" onClick={loadMoreJobs}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </>
  );
};

export default JobCard;
