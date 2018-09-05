import React from 'react';
import { mount } from 'enzyme';
import { SearchBar } from './components/SearchBar.js';

test('Search method should be called', () => {
  const searchTerm = '';
  const handleChange = jest.fn();
  const clearSearch = jest.fn();
  const searchBook = jest.fn();
  const event = { target: { value: "Harry Potter" } };

  const wrapper = mount(
    <SearchBar
      searchTerm={searchTerm}
      handleChange={handleChange}
      clearSearch={clearSearch}
      searchBook={searchBook}
    />
  );

  const search = wrapper.find('#formInlineName');
  expect(search.simulate("change", event));
  expect(handleChange).toHaveBeenCalledTimes(1);

  const btn = wrapper.find('.btn');
  expect(btn.simulate("click"));
  expect(searchBook).toHaveBeenCalledTimes(1);

});
