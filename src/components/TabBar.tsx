import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import cx from 'classnames';

import './TabBar.scss';
import {
  State, Tracker, addTracker, deleteTracker,
} from '../redux/reducers';

type TabProps = {
  tab: Tracker;
  active: boolean;
  onDelete: (id: string) => void;
};

const Tab: React.FC<TabProps> = ({ tab, active, onDelete }) => {
  const handleDelete: React.EventHandler<React.MouseEvent> = e => {
    e.preventDefault();
    onDelete(tab.id);
  };
  const tabLabel = tab.name || 'New Tracker';
  return (
    <Link className={cx('Tab', { Tab__Active: active })} to={`/tracker/${tab.id}`}>
      <span>{tabLabel}</span>
      <button onClick={handleDelete} type="button">
        ✖
      </button>
    </Link>
  );
};

const TabBar: React.FC = () => {
  const dispatch = useDispatch();
  const tabs = useSelector<State, Tracker[]>(store => store.trackers.list);
  const handleAdd = () => dispatch(addTracker());
  const handleDelete = (id: string) => dispatch(deleteTracker(id));
  const { params } = useRouteMatch<{ trackerId: string }>();
  return (
    <div className="TabBar">
      {tabs.map(tab => (
        <Tab tab={tab} active={tab.id === params.trackerId} onDelete={handleDelete} key={tab.id} />
      ))}
      <button onClick={handleAdd} type="button" className="AddButton">
        +
      </button>
    </div>
  );
};

export default TabBar;
