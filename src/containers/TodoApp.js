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

  handleChange = e => {
    this.setState({
      newItem: e.target.value
    });
  }

  addItem = () => {
    const { newItem, items } = this.state;
    if (!newItem) {
      return;
    }
    this.setState({
      items: [...items, {id: items.length, name: newItem}],
      newItem: ''
    });

  }

  render() {
    const { items, newItem } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} className="text-center">
            <h2> ADD ITEM </h2>
            <hr className="border-line"/>
            <Form inline >
              <FormGroup controlId="formInlineName" className="mg-t-20">
                <FormControl
                  type="text"
                  placeholder="New Task"
                  className="custom-input"
                  onChange={(e)=>this.handleChange(e)}
                  value={newItem}
                />
              </FormGroup>{' '}
              <Button bsStyle="primary custom-btn mg-t-20" onClick={this.addItem}>
                <i className="fa fa-plus" aria-hidden="true"></i>
                Add
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="text-center mg-t-20">
            <h2> TODO ITEMS </h2>
            <hr className="border-line"/>
            <ul className="mg-t-20">
              <TodoItem items={items} />
            </ul>
          </Col>
          <Col xs={6} className="text-center mg-t-20">
            <h2> COMPLETED ITEMS </h2>
            <hr className="border-line"/>
          </Col>
        </Row>
      </Grid>
    )
  }
}