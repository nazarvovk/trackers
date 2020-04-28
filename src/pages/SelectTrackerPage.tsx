import React from 'react';
import './SelectTrackerPage.scss';

const SelectTrackerPage: React.FC = () => {
  return (
    <main className="SelectTrackerPage">
      <p>Select a tracker or create a new one</p>

      <p className="author">
        Made by
        <a target="_blank" rel="noopener noreferrer" href="http://nvovk.com/">
          Nazar Vovk
        </a>
      </p>
    </main>
  );
};

export default SelectTrackerPage;
