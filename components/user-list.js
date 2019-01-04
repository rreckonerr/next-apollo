import React, { Component, Fragment } from "react";

import UserForm from "./user-form";
import UserCard from "./user-card";

export default class UserList extends Component {
  componentDidMount() {
    this.props.subscribeToUserList();
  }
  render() {
    const { users, onUserDelete, onLoadMore } = this.props;
    return (
      <Fragment>
        <UserForm />
        {users && users.length > 0 ? users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onUserDelete={() => onUserDelete(user)}
          />
        )) : null}
        <button onClick={onLoadMore} style={{backgroundColor: 'red'}}>Load more!</button>
      </Fragment>
    );
  }
}
