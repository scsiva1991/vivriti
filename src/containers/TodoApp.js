import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import TodoItem from '../components/TodoItem';

export default class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: ''
    }
  }

  componentDidMount = () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    if (items) {
      this.setState({
        items
      })
    }
  }

  handleChange = e => {
    this.setState({
      newItem: e.target.value
    });
  }

  addItem = e => {
    if (e) {
      e.preventDefault();
    }
    const { newItem, items } = this.state;
    if (!newItem) {
      return;
    }
    const currentItems = [...items, {id: new Date().valueOf(), name: newItem, isCompleted: false}]
    this.setState({
      items: currentItems,
      newItem: ''
    });
    this.saveToStorage(currentItems);
  }

  handleEdit = (id, name) => {
    const { items } = this.state;
    const updatedItems = items.map(item => {
      if (item.id !== id) {
        return item;
      }
      return {...item, name}
    });
    this.setState({
      items: [...updatedItems]
    });
    this.saveToStorage(updatedItems);
  }

  handleDelete = id => {
    const { items } = this.state;
    const filteredItems = items.filter(item => item.id !== id);
    this.setState({
      items: [...filteredItems]
    });
    this.saveToStorage(filteredItems);
  }

  moveToCompleted = (id, status) => {
    const { items } = this.state;
    const updatedItems = items.map(item => {
      if (item.id !== id) {
        return item;
      }
      return {...item, isCompleted: status}
    });
    this.setState({
      items: [...updatedItems]
    });
    this.saveToStorage(updatedItems);
  }

  saveToStorage = items => {
    localStorage.setItem('items', JSON.stringify(items));
  }

  render() {
    const { items, newItem } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} className="text-center">
            <h2> ADD ITEM </h2>
            <hr className="border-line"/>
            <Form inline onSubmit={(e) => this.addItem(e)}>
              <FormGroup controlId="formInlineName" className="mg-t-20">
                <FormControl
                  type="text"
                  placeholder="New Task"
                  className="custom-input"
                  onChange={(e)=>this.handleChange(e)}
                  value={newItem}
                />
              </FormGroup>{' '}
              <Button bsStyle="primary" className="custom-btn mg-t-20" onClick={(e) => this.addItem(e)}>
                <i className="fa fa-plus" aria-hidden="true"></i>
                Add
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="mg-t-20">
            <h2 className="text-center"> TODO ITEMS </h2>
            <hr className="border-line"/>
            <ul className="mg-t-20">              
              {/* {
                items.length === 0 &&
                <h4> No Items Found </h4>
              } */}
              {
                items.map(item => {
                  if (item.isCompleted) {
                    return '';
                  }
                  return (
                    <TodoItem 
                      key={item.id}
                      item={item}
                      handleEdit={this.handleEdit}
                      handleDelete={this.handleDelete}
                      moveToCompleted={this.moveToCompleted}
                      isCompleted={false}
                    />
                  )
                })
                
              }              
            </ul>
          </Col>
          <Col xs={6} className="mg-t-20">
            <h2 className="text-center"> COMPLETED ITEMS </h2>
            <hr className="border-line"/>
            <ul className="mg-t-20"> 
              {
                items.map(item => {
                  if (!item.isCompleted) {
                    return '';
                  }
                  return (
                    <TodoItem 
                      key={item.id}
                      item={item}
                      handleEdit={this.handleEdit}
                      handleDelete={this.handleDelete}
                      moveToCompleted={this.moveToCompleted}
                      isCompleted={true}
                    />
                  )
                })
                
              }              
            </ul>
          </Col>
        </Row>
      </Grid>
    )
  }
}