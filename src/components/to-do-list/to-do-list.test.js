import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';

describe('<ToDoList />', () => {
  test('it should mount', () => {
    render(<ToDoList />);
    
    const toDoList = screen.getByTestId('ToDoList');

    expect(toDoList).toBeInTheDocument();
  });
});