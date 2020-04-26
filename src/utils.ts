import { Store } from 'redux';
import { nanoid } from 'nanoid';
import wordsToNumbers from 'words-to-numbers';
import { singular } from 'pluralize';
import {
  State, Tracker, TrackerNameProperties, TrackerEntry,
} from './redux/reducers';

export const getLocalStorageState = (): object | undefined => {
  try {
    const serializedState = localStorage.getItem('state') ?? '';
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
interface StoredState {
  [key: string]: any
}
export const mapLocalStorageToState = (rawState: StoredState): State => {
  const { trackers } = rawState;
  return {
    trackers: {
      list: trackers.list.map((tracker: Tracker): Tracker => {
        return {
          id: tracker.id ?? nanoid(),
          name: tracker.name ?? '',
          goalNumber: tracker.goalNumber ?? null,
          unit: tracker.unit ?? null,
          entries: tracker.entries ?? [],
        };
      }),
    },
  };
};
export const saveToLocalStorageObserver = (store: Store<State>) => {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
  });
};
export const newTracker = (): Tracker => {
  return {
    id: nanoid(),
    name: '',
    goalNumber: null,
    unit: null,
    entries: [],
  };
};
export const newTrackerEntry = (): TrackerEntry => {
  return {
    id: nanoid(),
    value: null,
    created: Number(new Date()),
  };
};
export const getNumberFromArray = (wordList: string[]): number | null => {
  const number = wordList.find(word => { return !Number.isNaN(+word); });
  return number ? Number(number) : null;
};
export const getNumberFromString = (str: string): number | null => {
  return getNumberFromArray(str.split(' '));
};

// TODO refactor this ugly function
export const getTrackerNameProperties = (name: string): TrackerNameProperties => {
  const transformedText = String(wordsToNumbers(name.replace(' an ', ' a '))) ?? '';
  const wordList = transformedText.split(' ');
  const goalNumber = getNumberFromArray(wordList);
  // Unit = word that goes after the number
  let unit = null;
  wordList.forEach((word, i) => {
    if (+word === goalNumber) {
      unit = singular(wordList[i + 1] || wordList[i - 1]).toLowerCase();
    }
  });
  return {
    goalNumber: Number(goalNumber),
    unit,
  };
};

export function hideKeyboard() {
  setTimeout(() => {
    const field = document.createElement('input');
    field.setAttribute('type', 'text');
    field.setAttribute('style',
      `position:absolute;
      top: 0px;
      opacity: 0;
      -webkit-user-modify: read-write-plaintext-only;
      left:0px;`,
    );
    document.body.appendChild(field);
    field.onfocus = () => {
      setTimeout(() => {
        field.setAttribute('style', 'display:none;');
        setTimeout(() => {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);
      }, 200);
    };
    field.focus();
  }, 50);
}
