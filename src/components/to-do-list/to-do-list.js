import React from 'react';
import PropTypes from 'prop-types';
import styles from './to-do-list.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { add, edit, remove } from '../../slices/to-do-slice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Checkbox } from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';

const ToDoList = () => {
  const items = useSelector((state) => state.toDo.items)
  const dispatch = useDispatch()

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Button sx={{width:'100%'}}
                onClick={() => dispatch(add())}>
                <AddCircle sx={{mr:2}}/> Add A Pokemon
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Checkbox size='large'/>
              </TableCell>
              <TableCell>
                <img src={row.image} /> 
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                <ButtonGroup>
                  <Button>
                    <Edit/>
                  </Button>
                  <Button>
                    <Delete/>
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 

ToDoList.propTypes = {};

ToDoList.defaultProps = {};

export default ToDoList;
