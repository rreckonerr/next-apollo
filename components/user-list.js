import React, { Component, Fragment } from "react";

import UserForm from "./user-form";
import UserCard from "./user-card";

import styled from 'styled-components';
import { theme, hex2Rgba } from '../styles'

const UsersWrapper = styled.div`
  width: 100%;
  margin: 1em 0;
  border: 1px solid ${({ theme }) => hex2Rgba(theme.color.primary, 0.3)};

  background-color: white;
`;

const FormWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`

const usersListHeader = {
  login: 'LOGIN',
  id: 'ID',
  fullName: 'NAME'
}

export default class UserList extends Component {
  componentDidMount() {
    this.props.subscribeToUserList();
  }
  render() {
    const { users, onUserDelete, onLoadMore } = this.props;
    return (
      <Fragment>
      <FormWrapper>
        <UserForm />
      </FormWrapper>
        <UsersWrapper>
        <UserCard user={usersListHeader} />
          {users && users.length > 0
            ? users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserDelete={() => onUserDelete(user)}
                />
              ))
            : null}
        </UsersWrapper>
        <button onClick={onLoadMore} style={{ backgroundColor: "red" }}>
          Load more!
        </button>
      </Fragment>
    );
  }
}
