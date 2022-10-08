import React from 'react';
import PropTypes from 'prop-types';
import styles from './to-do-item.module.scss';

const ToDoItem = () => (
  <div className={styles.ToDoItem} data-testid="ToDoItem">
    ToDoItem Component
  </div>
);

ToDoItem.propTypes = {};

ToDoItem.defaultProps = {};

export default ToDoItem;
