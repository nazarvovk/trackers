/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';

import { newTracker, hideKeyboard } from './utils';
import {
  Tracker,
  changeTrackerName,
  addTrackerEntry,
  deleteTrackerEntry,
  changeTrackerEntry,
} from './redux/reducers';

export const useTrackerHandlers = (
  tracker: Tracker | undefined = newTracker(),
  nameInputRef: React.RefObject<HTMLInputElement>,
) => {
  const dispatch = useDispatch();

  const handleNameChange = (e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault();
    const value = nameInputRef?.current?.value;
    if (value !== tracker.name) {
      dispatch(changeTrackerName(tracker.id, value));
    }
    hideKeyboard();
  };
  const handleAddEntry = () => {
    dispatch(addTrackerEntry(tracker.id));
  };
  const handleDeleteEntry = (entryId: string) => {
    dispatch(deleteTrackerEntry(tracker.id, entryId));
  };
  const handleChangeEntry = (entryId: string, value: string) => {
    dispatch(changeTrackerEntry(tracker.id, entryId, value));
  };
  return {
    handleNameChange,
    handleAddEntry,
    handleDeleteEntry,
    handleChangeEntry,
  };
};
