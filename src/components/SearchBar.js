import React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

export const SearchBar = (props) => {
  return (
    <Form inline onSubmit={(e) => props.searchBook(e)} className="text-center">
      <FormGroup controlId="formInlineName" className="mg-t-20">       
        <FormControl
          type="text"
          placeholder="Search a book by name"
          className="searchbar"
          onChange={(e)=>props.handleChange(e)}
          value={props.searchTerm}
        />
        {
          props.searchTerm &&
          <i className="fa fa-times-circle delete-icon" onClick={props.clearSearch}></i>
          
        }        
      </FormGroup>{' '}
      <Button bsStyle="primary" className="mg-t-20" onClick={(e) => props.searchBook(e)}>
        <i className="fa fa-search" aria-hidden="true"></i>
        Search
      </Button>
    </Form>
  )
}