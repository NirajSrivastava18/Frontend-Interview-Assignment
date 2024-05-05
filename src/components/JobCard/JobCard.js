import React, { useState, useEffect } from 'react';
import fetchSampleJdJSON from '../../utils/api.js';
import Filters from '../Filters/Filters.js';
import './JobCard.css';

const JobCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState({ jdList: [] });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchSampleJdJSON();
        if (!data) {
          setError('Invalid data');
        } else {
          setJobData(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (filters) => {
    if (!jobData || !jobData.jdList) {
      return;
    }

    let filteredJobs = jobData.jdList;

    if (filters.minExp) {
      filteredJobs = filteredJobs.filter(
        (job) => job?.minExp >= filters.minExp
      );
    }

    if (filters.companyName && filters.companyName !== '') {
      filteredJobs = filteredJobs.filter(
        (job) => job.companyName === filters.companyName
      );
    }
    if (filters.location && filters.location !== '') {
      filteredJobs = filteredJobs.filter(
        (job) => job.location === filters.location
      );
    }
    if (filters.remoteOrOnsite && filters.remoteOrOnsite !== '') {
      filteredJobs = filteredJobs.filter((job) => {
        if (filters.remoteOrOnsite === 'remote') {
          return job.location === 'remote';
        } else {
          return job.location !== 'remote';
        }
      });
    }
    if (filters.jobRole && filters.jobRole !== '') {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobRole === filters.jobRole
      );
    }
    if (filters.minBasePay && filters.minBasePay !== '') {
      const minBasePayFilter = parseInt(filters.minBasePay, 10);
      filteredJobs = filteredJobs.filter(
        (job) => job.minJdSalary >= minBasePayFilter
      );
    }
    setFilteredJobs(filteredJobs);
    console.log(filteredJobs);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const jobsToRender = filteredJobs.length ? filteredJobs : jobData.jdList;

  return (
    <>
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
                {job.jobDetailsFromCompany}
              </p>
            )}
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
    </>
  );
};

export default JobCard;
