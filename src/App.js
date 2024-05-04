import React from 'react';
import JobCard from './components/JobCard/JobCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <JobCard jobs={[]} />
    </div>
  );
}

export default App;
