import { Reducer, ActionCreator, Action } from 'redux';
import {
  newTracker,
  getTrackerNameProperties,
  newTrackerEntry,
} from '../utils';

const actionTypes = {
  SET_TRACKERS_LIST: 'SET_TRACKERS_LIST',
  ADD_TRACKER: 'ADD_TRACKER',
  REMOVE_TRACKER: 'REMOVE_TRACKER',
  CHANGE_TRACKER_NAME: 'CHANGE_TRACKER_NAME',
  ADD_TRACKER_ENTRY: 'ADD_TRACKER_ENTRY',
  DELETE_TRACKER_ENTRY: 'DELETE_TRACKER_ENTRY',
  CHANGE_TRACKER_ENTRY: 'CHANGE_TRACKER_ENTRY',
};

/**
 *  Action Creators
 * */
export const addTracker: ActionCreator<Action> = () => ({
  type: actionTypes.ADD_TRACKER,
});

export const deleteTracker: ActionCreator<Action> = (id: string) => ({
  type: actionTypes.REMOVE_TRACKER,
  trackerId: id,
});
export const changeTrackerName: ActionCreator<Action> = (id: string, value: string) => ({
  type: actionTypes.CHANGE_TRACKER_NAME,
  trackerId: id,
  value,
});
export const addTrackerEntry: ActionCreator<Action> = (trackerId: string) => ({
  type: actionTypes.ADD_TRACKER_ENTRY,
  trackerId,
});
export const deleteTrackerEntry: ActionCreator<Action> = (trackerId: string, entryId: string) => ({
  type: actionTypes.DELETE_TRACKER_ENTRY,
  trackerId,
  entryId,
});
export const changeTrackerEntry: ActionCreator<Action> = (trackerId: string, entryId: string, value: string) => ({
  type: actionTypes.CHANGE_TRACKER_ENTRY,
  trackerId,
  entryId,
  value,
});

export type Tracker = {
  id: string,
  name: string,
  entries: TrackerEntry[],
} & TrackerNameProperties

export type TrackerNameProperties = {
  goalNumber: number | null,
  unit: string | null,
}

export type TrackerEntry = {
  id: string,
  value: number | null,
  created: number
}

type TrackersState = {
  list: Tracker[]
}

const initialTrackersState: TrackersState = {
  list: [],
};

const trackersReducer: Reducer<TrackersState> = (state = initialTrackersState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.SET_TRACKERS_LIST:
      return { ...state, list: action.list };
    case actionTypes.ADD_TRACKER:
      return {
        ...state,
        list: state.list.concat(newTracker()),
      };
    case actionTypes.REMOVE_TRACKER:
      return {
        ...state,
        list: state.list.filter(tracker => tracker.id !== action.trackerId),
      };
    case actionTypes.CHANGE_TRACKER_NAME: {
      const newName: string = action.value;
      const properties = getTrackerNameProperties(newName);
      return {
        ...state,
        list: state.list.map(
          tracker => (tracker.id === action.trackerId
            ? {
              ...tracker, name: newName, ...properties,
            }
            : tracker),
        ),
      };
    }
    case actionTypes.ADD_TRACKER_ENTRY: {
      const { trackerId } = action;
      const tracker = state.list.find(t => t.id === trackerId);
      if (!tracker) throw Error('Tracker not found');
      const updatedTracker: Tracker = {
        ...tracker,
        entries: tracker.entries.concat(newTrackerEntry()),
      };
      return {
        ...state,
        list: state.list.map(
          t => (t.id === action.trackerId
            ? updatedTracker
            : t),
        ),
      };
    }
    case actionTypes.DELETE_TRACKER_ENTRY: {
      const { trackerId, entryId } = action;
      const tracker = state.list.find(t => t.id === trackerId);
      if (!tracker) throw Error('Tracker not found');
      const updatedTracker: Tracker = {
        ...tracker,
        entries: tracker.entries.filter(entry => entry.id !== entryId),
      };
      return {
        ...state,
        list: state.list.map(
          t => (t.id === action.trackerId
            ? updatedTracker
            : t),
        ),
      };
    }
    case actionTypes.CHANGE_TRACKER_ENTRY: {
      const { trackerId, entryId, value } = action;
      const tracker = state.list.find(t => t.id === trackerId);
      if (!tracker) throw Error('Tracker not found');
      const updatedTracker: Tracker = {
        ...tracker,
        entries: tracker.entries.map(entry => (entry.id === entryId ? {
          ...entry,
          value,
        } : entry)),
      };
      return {
        ...state,
        list: state.list.map(
          t => (t.id === action.trackerId
            ? updatedTracker
            : t),
        ),
      };
    }
    default:
      return state;
  }
};


export type State = {
  trackers: TrackersState
}

export default {
  trackers: trackersReducer,
};
