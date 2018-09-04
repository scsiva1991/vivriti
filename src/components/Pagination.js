import React from 'react';
import { Pager } from 'react-bootstrap';

export const Pagination = props => {
  const maxPage = Math.ceil(props.totalBooks / 20);
  return (
    <Pager>
      <Pager.Item > 
        First
      </Pager.Item>
      {' '}
      <Pager.Item>
        <i className="fa fa-caret-left m-l-5" />
      </Pager.Item>
      {' '}
      <Pager.Item className="active-page m-l-5 m-r-5">
        {props.currentPage}
      </Pager.Item>
      {' '}
      <Pager.Item>
        <i className="fa fa-caret-right m-l-5" />
      </Pager.Item>
      {' '}
      <Pager.Item>
        Last
      </Pager.Item>
    </Pager>
  )
}