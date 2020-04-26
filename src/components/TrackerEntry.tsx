import React, { useRef } from 'react';
import cx from 'classnames';
import moment from 'moment';

import { TrackerEntry as TrackerEntryType } from '../redux/reducers';
import './TrackerEntry.scss';
import Delete from '../icons/Delete';
import { hideKeyboard } from '../utils';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
};

const EntryInput: React.FC<InputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(inputRef?.current?.value ?? value);
    hideKeyboard();
  };
  return (
    <form onSubmit={handleChange}>
      <input type="number" onBlur={handleChange} ref={inputRef} defaultValue={value} />
    </form>
  );
};

type Props = {
  entry: TrackerEntryType;
  onDelete: (entryId: string) => void;
  onChange: (entryId: string, value: string) => void;
  isReached: boolean;
};

const TrackerEntry: React.FC<Props> = ({
  entry, onDelete, onChange, isReached,
}) => {
  const handleDelete = () => onDelete(entry.id);
  const handleChange = (value: string) => onChange(entry.id, value);

  return (
    <div className={cx('TrackerEntry', { Reached: isReached })}>
      <div className="InputContainer">
        <EntryInput value={String(entry.value)} onChange={handleChange} />
      </div>
      <span className="TrackerEntryTime">{moment(entry.created).format('HH:mm[\n]MMM DD')}</span>
      <button onClick={handleDelete} className="DeleteButton" type="button">
        <Delete size={32} color="#ffffff" />
      </button>
    </div>
  );
};

export default TrackerEntry;
