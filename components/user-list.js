import React, { Component, Fragment } from "react";

import UserForm from "./user-form";
import UserCard from "./user-card";

import styled from "styled-components";
import { theme, hex2Rgba } from "../styles";
import { Query, Mutation } from "react-apollo";

import { GET_USERS } from "../pages/index";
import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
  mutation removeUser($login: String!) {
    removeUser(login: $login) {
      id
    }
  }
`;

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
        <FormWrapper>
          <UserForm />
        </FormWrapper>
        <UsersWrapper>
          <UserCard user={usersListHeader} />
          <Mutation mutation={DELETE_USER_MUTATION}>
            {mutate =>
              users && users.length > 0
                ? users.map(user => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onUserDelete={() =>
                        mutate({
                          variables: { login: user.login },
                          refetchQueries: [
                            {
                              query: GET_USERS,
                              variables: {
                                orderBy: "createdAt_DESC",
                                first: 5
                              }
                            }
                          ]
                        })
                      }
                    />
                  ))
                : null
            }
          </Mutation>
        </UsersWrapper>
      </Fragment>
    );
  }
}
