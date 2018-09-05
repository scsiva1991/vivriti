import React from 'react';
import { mount } from 'enzyme';
import { Book } from './components/Book.js';

test('Book item should be listed with details', () => {
  const book = { 
    id: 1,
    imageUrl: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
    title: 'Test Book',
    author: 'Siva',
    publishedYear: 2018,
    averageRating: 5
  };
  const wrapper = mount(
    <Book book={book} />
  );

  const title = wrapper.find('.media-heading');
  expect(title.text()).toBe('Test Book');

  const author = wrapper.find('.author');
  expect(author.text()).toBe('Siva');

  const year = wrapper.find('.year');
  expect(year.text()).toBe('2018');

});
