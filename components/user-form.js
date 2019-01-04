import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_USER = gql`
  mutation addUser($login: String!, $fullName: String!) {
    addUser(input: {
        login: $login
        fullName: $fullName
    }) {
      id
    }
  }
`;

const GET_USERS = gql`
  query {
    users(orderBy: createdAt_DESC, first: 5) {
      login
      fullName
      id
    }
  }
`;

export default class UserForm extends Component {
    state = {
        newUserLogin: "",
        newUserName: ""
      };
    
      render() {
        const { newUserLogin, newUserName } = this.state;
        const input = { login: newUserLogin, fullName: newUserName };
    
        return (
          <Mutation mutation={ADD_USER} variables={{ login: newUserLogin, fullName: newUserName }}>
            {mutate => (
              <form
                onSubmit={ev => {
                  ev.preventDefault();
    
    
                  return mutate({
                    // refetchQueries: [{
                    //   query: GET_USERS,
                    // }]
                  });
                }}
              >
                <input
                  type="text"
                  value={this.newUserLogin}
                  onChange={this.handleNewUserLogin}
                  placeholder="login"
                />
                <input
                  type="text"
                  value={this.newUserName}
                  onChange={this.handleNewUserName}
                  placeholder="name"
                />
                <button type="submit">Add user</button>
              </form>
            )}
          </Mutation>
        );
      }
    
      handleNewUserName = ev => {
        ev && ev.preventDefault && ev.preventDefault();
        this.setState({
          newUserName: ev.target.value
        });
      };
    
      handleNewUserLogin = ev => {
        ev && ev.preventDefault && ev.preventDefault();
        this.setState({
          newUserLogin: ev.target.value
        });
      };
    }
    