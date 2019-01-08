import React, { Component } from "react";
import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
`

export default class UserCard extends Component {
  render() {
    const { user, onUserDelete } = this.props;

    return (
      <div>
        <div>{user.login}</div>
        <button onClick={() => onUserDelete()}>Delete Me!</button>
        <Button>I'm blue</Button>
      </div>
    );
  }
}
