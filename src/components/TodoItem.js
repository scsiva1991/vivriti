import React, { Component } from 'react';

export default class TodoItem extends Component {

  constructor(props) {
    super(props);
  }

  renderTodoItem = () => {
    const { items } = this.props;
    return items.map(item => {
      return (
        <li key={item.id}>
          {item.name}
        </li>
      )
    });
  }

  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <h4> No Items Found </h4>
    }

    return (
      this.renderTodoItem()
    )
  }
}