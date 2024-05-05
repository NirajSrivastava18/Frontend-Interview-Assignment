import React, { useState, useEffect } from 'react';
import fetchSampleJdJSON from '../../utils/api.js';
import styles from './DescModal.module.css';

function Modal({ closeModal, jobId }) {
  // State to hold the fetched job data
  const [jobData, setJobData] = useState({ jdList: [] });

  // Fetch the job data when the component is mounted
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch the data from the API
        const data = await fetchSampleJdJSON();
        // If the data is truthy, set the jobData state
        if (data) {
          setJobData(data);
          if (!data) {
            console.error('Failed to fetch job data');
          } else {
            setJobData(data);
          }
        }
      } catch (error) {
        // Log any errors that occur during the data fetch
        console.error('Error fetching job data:', error);
      }
    };
    fetchJobs();
  }, []);

  // If the jobData state is falsy, return null, indicating that the data has not been fetched yet
  if (!jobData) {
    return null;
  }

  // Find the job object in the jobData.jdList array that matches the provided jobId
  const job = jobData.jdList.find((job) => job.jdUid === jobId);
  console.log(job);

  // Render the modal window with the job details, or a message indicating that no job details were found
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          <h1>Job Description</h1>
          {job && job.jobDetailsFromCompany ? (
            <p className={styles.desc}>{job.jobDetailsFromCompany}</p>
          ) : (
            <p className={styles.desc}>No job description found</p>
          )}
        </div>
        <div className={styles.footer}>
          {/* Render a Cancel button that, when clicked, calls the closeModal function (passed as a prop) with a false argument, indicating that the modal should be closed */}
          <button
            onClick={() => {
              if (closeModal) {
                closeModal(false);
              }
            }}
            id={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
