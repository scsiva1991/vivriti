import React from 'react';
import { Pager } from 'react-bootstrap';

export const Pagination = props => {
  const maxPage = Math.ceil(props.totalBooks / 20);
  return (
    <Pager className="pull-right">
      <Pager.Item onClick={props.redirectToFirstPage}> 
        First
      </Pager.Item>
      {' '}
      <Pager.Item onClick={props.prevPage} className={props.currentPage <= 1 ? 'disabled' : ''}>
        <i className="fa fa-caret-left m-l-5" />
      </Pager.Item>
      {' '}
      <Pager.Item className="active-page m-l-5 m-r-5">
        {props.currentPage}
      </Pager.Item>
      {' '}
      <Pager.Item onClick={props.nextPage} className={props.currentPage >= maxPage ? 'disabled' : ''}>
        <i className="fa fa-caret-right m-l-5" />
      </Pager.Item>
      {' '}
      <Pager.Item onClick={props.redirectToLastPage}>
        Last
      </Pager.Item>
    </Pager>
  )
}