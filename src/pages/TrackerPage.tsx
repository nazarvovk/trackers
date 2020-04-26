import React, { useRef } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import './TrackerPage.scss';
import TrackerEntry from '../components/TrackerEntry';
import { State, Tracker } from '../redux/reducers';
import { useTrackerHandlers } from '../hooks';

const TrackerPage: React.FC = () => {
  const {
    params: { trackerId },
  } = useRouteMatch<{ trackerId: string }>();
  const tracker = useSelector<State, Tracker | undefined>(store =>
    store.trackers.list.find(t => t.id === trackerId),
  );
  const nameInputRef = useRef(null);
  const {
    handleNameChange,
    handleAddEntry,
    handleDeleteEntry,
    handleChangeEntry,
  } = useTrackerHandlers(tracker, nameInputRef);
  if (!tracker) {
    return <Redirect to="/tracker" />;
  }
  const { name, entries } = tracker;
  const shouldRenderEntries = Boolean(name || entries.length);
  return (
    <main key={trackerId}>
      <div className="Container">
        <div className="TrackerInfoContainer">
          <form className="NameInputContainer" onSubmit={handleNameChange}>
            <input
              id="NameInput"
              type="text"
              className={cx({ empty: !name })}
              defaultValue={name}
              onBlur={handleNameChange}
              ref={nameInputRef}
            />
            <label htmlFor="NameInput">{name ? 'Goal:' : 'Enter your goal'}</label>
          </form>
        </div>
        {shouldRenderEntries && (
          <div className="EntriesContainer">
            <h2>Entries:</h2>
            <button onClick={handleAddEntry} type="button" className="AddEntryContainer">
              <span className="AddEntryButton">+</span>
            </button>
            <div className="EntriesListContainer">
              {tracker.entries
                .sort((a, b) => b.created - a.created)
                .map(entry => (
                  <TrackerEntry
                    entry={entry}
                    key={entry.id}
                    isReached={
                      !!tracker.goalNumber && Number(entry.value) >= Number(tracker.goalNumber)
                    }
                    onChange={handleChangeEntry}
                    onDelete={handleDeleteEntry}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackerPage;
