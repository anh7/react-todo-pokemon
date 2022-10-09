import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './to-do-list.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addThunk, edit, toggleComplete, remove, startEditing, endEditing, changeName, startAdding } from '../../slices/to-do-slice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Checkbox, Skeleton, TextField, Typography } from '@mui/material';
import { AddCircle, Check, Delete, Edit, ImageNotSupported } from '@mui/icons-material';

const ToDoList = () => {
  const stateItems = useSelector((state) => state.toDo.items);
  const stateIsAdding = useSelector((state) => state.toDo.controlStatus.isAdding);
  const dispatch = useDispatch();
  const [items, setItems] = useState(stateItems);
  const [isAdding, setIsAdding] = useState(stateIsAdding);

  const addItem = () => {
    dispatch(startAdding());
    dispatch(addThunk());
  }

  useEffect(() => {
    setItems(stateItems);
  }, [stateItems]);
  useEffect(() => {
    setIsAdding(stateIsAdding);
  }, [stateIsAdding])

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Button sx={{width:'100%'}}
                disabled={isAdding}
                onClick={() => addItem()}>
                <AddCircle sx={{mr:2}}/> Add A Pokemon
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (!items || items.length === 0) && !isAdding &&
            <TableRow>
              <TableCell colSpan={4} align={'center'}>
                <Typography variant="subtitle1" gutterBottom>
                  No data yet. Click the button above to add a new row.
                </Typography>
              </TableCell>
            </TableRow>
          }
          { isAdding &&
            <TableRow>
              <TableCell colSpan={4}>
                <Skeleton variant="rounded" width={'100%'} height={60} ></Skeleton>
              </TableCell>
            </TableRow>
          }
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Checkbox size='large' onClick={() => toggleComplete(row.id)}/>
              </TableCell>
              <TableCell align='center'>
                { 
                  !row.image &&
                  <ImageNotSupported/>
                }
                {
                  row.image &&
                  <img src={row.image} alt={`Front of ${row.name}`}/> 
                }
              </TableCell>
              <TableCell>
                {
                  row.isEditing &&
                  <TextField
                    id={`text-field-id-${row.id}`} 
                    label="Name" 
                    variant="outlined"
                    value={row.name}
                    onChange={(e) => dispatch(changeName({
                      id: row.id,
                      newName: e.target.value
                    }))}
                    InputProps={{endAdornment: 
                      <Button onClick={() => dispatch(endEditing(row.id))}>
                        <Check />
                      </Button>
                    }}
                    />
                }
                {!row.isEditing && row.name}
              </TableCell>
              <TableCell align="right">
                <ButtonGroup>
                  <Button 
                    disabled={row.isEditing}
                    onClick={() => dispatch(startEditing(row.id))}>
                    <Edit/>
                  </Button>
                  <Button onClick={() => dispatch(remove(row.id))}>
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
