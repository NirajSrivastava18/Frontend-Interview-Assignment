import React, { useState, useEffect } from 'react';
import fetchSampleJdJSON from '../../utils/api.js';
import './JobCard.css';

const JobCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState({ jdList: [] });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchSampleJdJSON();
        if (!data) {
          console.log(error);
          throw new Error('Invalid data');
        }
        setJobData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="job-card">
      {jobData.jdList.map((job) => (
        <div className="job-card-item" key={job.jdUid}>
          {job.logoUrl && <img class="logoUrl" src={job.logoUrl} alt="logo" />}
          {job.companyName && (
            <h2 className="company-name">{job.companyName}</h2>
          )}
          {job.jobRole && <p className="title">{job.jobRole}</p>}
          {job.location && <p className="location">{job.location}</p>}

          {job.maxJdSalary && job.minJdSalary && (
            <p>
              Estimated Salary: {job.salaryCurrencyCode} {job.maxJdSalary} -{' '}
              {job.minJdSalary} LPA ✅
            </p>
          )}
          {job.jobDetailsFromCompany && (
            <p className="description">{job.jobDetailsFromCompany}</p>
          )}
          {job.minExp && job.maxExp && (
            <p className="experience-required">
              Exp {job.minExp}-{job.maxExp} years
            </p>
          )}
          <div class="Btn-area">
            {job.jdLink && (
              <a href={job.jdLink} className="apply-button">
                ⚡ Easy Apply
              </a>
            )}

            <button class="referral">Unlock referral asks </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;