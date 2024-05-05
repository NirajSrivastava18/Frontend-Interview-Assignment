import React, { useState, useEffect } from 'react';
import fetchSampleJdJSON from '../../utils/api.js';
import styles from './DescModal.module.css';

function Modal({ closeModal, jobId }) {
  const [jobData, setJobData] = useState({ jdList: [] });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchSampleJdJSON();
        if (data) {
          if (!data) {
            console.error('Failed to fetch job data');
          } else {
            setJobData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchJobs();
  }, []);

  if (!jobData) {
    return null;
  }

  const job = jobData.jdList.find((job) => job.jdUid === jobId);
  console.log(job);

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
