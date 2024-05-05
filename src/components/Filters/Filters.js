import React, { useState } from 'react';

const Filters = ({ jobData, onFilterChange }) => {
  const [minExp, setMinExp] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOrOnsite, setRemoteOrOnsite] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  const handleMinExpChange = (e) => {
    const selectedExp = e.target.value;
    setMinExp(selectedExp);
    const filters = {
      minExp: selectedExp,
    };
    onFilterChange(filters);
  };

  const handleCompanyNameChange = (e) => {
    const selectedCompanyName = e.target.value;
    setCompanyName(selectedCompanyName);
    const filters = {
      companyName: selectedCompanyName,
    };
    onFilterChange(filters);
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    const filters = {
      location: selectedLocation,
    };
    onFilterChange(filters);
  };

  const handleRemoteOrOnsiteChange = (e) => {
    const selectedRemoteOrOnsite = e.target.value;
    setRemoteOrOnsite(selectedRemoteOrOnsite);
    const filters = {
      remoteOrOnsite: selectedRemoteOrOnsite,
    };
    onFilterChange(filters);
  };

  const handleJobRoleChange = (e) => {
    const selectedJobRole = e.target.value;
    setJobRole(selectedJobRole);
    const filters = {
      jobRole: selectedJobRole,
    };
    onFilterChange(filters);
  };

  const handleMinBasePayChange = (e) => {
    const selectedMinBasePay = e.target.value;
    setMinBasePay(selectedMinBasePay);
    const filters = {
      minBasePay: selectedMinBasePay,
    };
    onFilterChange(filters);
  };

  const renderOptions = () => {
    if (!Array.isArray(jobData.jdList)) {
      return null;
    }

    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i} years
        </option>
      );
    }

    return options;
  };

  const renderOptionPay = () => {
    if (!Array.isArray(jobData.jdList)) {
      return null;
    }

    const minBasePayOptions = [];
    for (let i = 5; i <= 110; i += 5) {
      minBasePayOptions.push(
        <option key={i} value={i}>
          {i}L
        </option>
      );
    }
    return minBasePayOptions;
  };

  const companyOptions = jobData.jdList.map((job) => job.companyName);
  const companyOptionsElements = companyOptions.map((company) => (
    <option key={company} value={company}>
      {company}
    </option>
  ));

  const locationOptions = jobData.jdList.map((job) => job.location);
  const uniqueLocationOptions = Array.from(new Set(locationOptions));
  const locationOptionsElements = uniqueLocationOptions.map((location) => (
    <option key={location} value={location}>
      {location}
    </option>
  ));

  const remoteOrOnsiteOptions = [
    { value: 'remote', label: 'Remote' },
    {
      value: locationOptions,
      label: 'Onsite',
    },
  ]; // Filter out disabled options

  const remoteOrOnsiteOptionsElements = remoteOrOnsiteOptions.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  const jobRoleOptions = jobData.jdList.map((job) => job.jobRole);
  const uniqueJobRoleOptions = Array.from(new Set(jobRoleOptions));
  const jobRoleOptionsElements = uniqueJobRoleOptions.map((jobRole) => (
    <option key={jobRole} value={jobRole}>
      {jobRole}
    </option>
  ));

  return (
    <div className="filters">
      <h2>Filters</h2>
      <form>
        <label>
          Min Experience:
          <select value={minExp} onChange={handleMinExpChange}>
            <option value="">All</option>
            {renderOptions()}
          </select>
        </label>
        <label>
          Company Name:
          <select value={companyName} onChange={handleCompanyNameChange}>
            <option value="">All</option>
            {companyOptionsElements}
          </select>
        </label>
        <label>
          Location:
          <select value={location} onChange={handleLocationChange}>
            <option value="">All</option>
            {locationOptionsElements}
          </select>
        </label>
        <label>
          Remote/Onsite:
          <select value={remoteOrOnsite} onChange={handleRemoteOrOnsiteChange}>
            <option value="">All</option>
            {remoteOrOnsiteOptionsElements}
          </select>
        </label>
        <label>
          Job Role:
          <select value={jobRole} onChange={handleJobRoleChange}>
            <option value="">All</option>
            {jobRoleOptionsElements}
          </select>
        </label>
        {jobData.jdList && (
          <label>
            Min Base Pay:
            <select value={minBasePay} onChange={handleMinBasePayChange}>
              <option value="">All</option>
              {renderOptionPay()}
            </select>
          </label>
        )}
      </form>
    </div>
  );
};

export default Filters;
