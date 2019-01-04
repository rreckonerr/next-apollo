import React, { Component } from "react";

export default class UserCard extends Component {
  render() {
    const { user, onUserDelete } = this.props;

    return (
      <div>
        <div>{user.login}</div>
        <button onClick={() => onUserDelete()}>Delete Me!</button>
      </div>
    );
  }
}
