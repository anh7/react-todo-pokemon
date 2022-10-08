import React from 'react';
import PropTypes from 'prop-types';
import styles from './to-do-list.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { add, edit, remove } from '../../slices/to-do-slice';

const ToDoList = () => {
  const items = useSelector((state) => state.toDo.items)
  const dispatch = useDispatch()

  return (
    // Should add MUI for styling
    <div className={styles.ToDoList} data-testid="ToDoList">
      ToDoList Component
      <button onClick={() => dispatch(add({id: 1, name: 'Test'}))}>Add</button>
    </div>
  );
} 

ToDoList.propTypes = {};

ToDoList.defaultProps = {};

export default ToDoList;
