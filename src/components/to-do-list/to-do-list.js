import React from 'react';
import PropTypes from 'prop-types';
import styles from './to-do-list.module.scss';

const ToDoList = () => (
  <div className={styles.ToDoList} data-testid="ToDoList">
    ToDoList Component
  </div>
);

ToDoList.propTypes = {};

ToDoList.defaultProps = {};

export default ToDoList;
