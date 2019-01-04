import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_USER_MUTATION = gql`
  mutation removeUser($login: String!) {
    removeUser(login: $login) {
      id
    }
  }
`;

class UserCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Login: {user.login}</h1>
        <p>Name: {user.fullName}</p>
        <p>Id: {user.id}</p>
        <Mutation
          mutation={DELETE_USER_MUTATION}
          variables={{ login: user.login }}
        >
          {deleteUserMutaton => (
            <button onClick={deleteUserMutaton}>Remove user</button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UserCard;
