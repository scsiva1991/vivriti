import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoItem from './components/TodoItem.js';

test('List todo items', () => {
  const todo = { id: 1, name: 'todo', isCompleted : false };
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const moveToCompleted = jest.fn();

  const wrapper = shallow(
    <TodoItem
      item={todo}
      handleEdit={handleEdit}
      moveToCompleted={moveToCompleted}
      handleDelete={handleDelete}
      isCompleted={false}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
