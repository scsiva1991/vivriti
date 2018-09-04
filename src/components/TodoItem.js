import React, { Component } from 'react';
import { Checkbox, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
export default class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
      isEditable: false
    }
  }

  updateItem = e => {
    this.setState({
      selectedItem: e.target.value
    })
  }

  onEdit = (item) => {
    const { selectedItem } = this.state;

    
    this.toggleEdit(item.name);

    if (!selectedItem || selectedItem === item.name) {
      return;
    }

    console.log('***', item.id, selectedItem);
    this.props.handleEdit(item.id, selectedItem);
  }

  onDelete = id => {
    this.props.handleDelete(id);
  }

  markCompleted = (id, e) => {
    this.props.moveToCompleted(id, e.target.checked);
  }

  toggleEdit = name => {
    this.setState({
      isEditable: !this.state.isEditable,
      selectedItem: !this.state.isEditable ? name : ''
    })
  }

  renderTodoItem = () => {
    const { item } = this.props;
    const { isEditable, selectedItem } = this.state;

    return (
      <li key={item.id} className="mg-t-20">
        <Form inline onSubmit={()=> this.onEdit(item)}>
          <Checkbox className="custom-check" onChange={(e)=>this.markCompleted(item.id, e)}/>
          {
            isEditable ? 
            <FormGroup controlId="formInlineName" className="m-r-13">
              <FormControl
                type="text"
                placeholder="Edit Task"
                className="w-200"
                onChange={(e)=>this.updateItem(e)}
                value={selectedItem}
              />
            </FormGroup>:
            <ControlLabel className="m-l-5 w-200 f-20 capitalize">{item.name}</ControlLabel>
          }     
          {' '}        
          <Button bsStyle="primary" className="m-l-5 custom-btn " onClick={()=> this.onEdit(item)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
            { !isEditable ? 'Edit' : 'Save' }
          </Button>{' '}
          <Button bsStyle="danger" className="custom-btn " onClick={()=> this.onDelete(item.id)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            Delete
          </Button>{' '}
          
        </Form>
      </li>
    );
  }

  renderCompletedItem = () => {
    const { item } = this.props;
    return (
      <li key={item.id} className="mg-t-20">
        <Form inline >
          <Checkbox className="custom-check" checked onChange={(e)=>this.markCompleted(item.id, e)}/>
          <ControlLabel className="m-l-5 w-200 completed-item f-20 capitalize">{item.name}</ControlLabel>
        </Form>
      </li>
    );
  }

  render() {
    const { isCompleted } = this.props;

    if (isCompleted) {
      return this.renderCompletedItem()
    }

    return (
      this.renderTodoItem()
    )
  }
}