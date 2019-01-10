import React, { Component, Fragment } from "react";

import UserCard from "./user-card";

import styled from "styled-components";
import { hex2Rgba } from "../styles";

const UsersWrapper = styled.div`
  width: 100%;
  margin: 1em 0;
  border: 1px solid ${({ theme }) => hex2Rgba(theme.color.primary, 0.3)};

  background-color: white;
`;


const usersListHeader = {
  login: "LOGIN",
  id: "ID",
  fullName: "NAME"
};

export default class UserList extends Component {
  componentDidMount() {
    this.props.subscribeToUserList();
  }
  render() {
    const { users } = this.props;
    return (
      <Fragment>
        <UsersWrapper>
          <UserCard user={usersListHeader} />
          {users && users.length > 0
            ? users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  queryVariables={this.props.queryVariables}
                />
              ))
            : null}
        </UsersWrapper>
      </Fragment>
    );
  }
}
