import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import UserList from "../components/user-list";
import UserForm from "../components/user-form";

import Pagination from "../components/pagination";
import styled from "styled-components";
import { BallsSpinner } from "../styles";

export const GET_USERS = gql`
  query users($orderBy: UserOrderByInput!, $first: Int!, $skip: Int) {
    users(orderBy: $orderBy, first: $first, skip: $skip) {
      login
      fullName
      id
    }
  }
`;

const NEW_USERS_SUBSCRIPTION = gql`
  subscription {
    users {
      node {
        id
        login
        fullName
      }
      previousValues {
        id
        login
        fullName
      }
    }
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export default class IndexPage extends Component {
  state = {
    queryVariables: {
      orderBy: "createdAt_DESC",
      first: 5,
      skip: 0
    }
  };

  /**
   * @method
   * @async
   * @summary async subscription function
   * @param {Function} subscribeToMore
   * @returns {Object}
   *        assignes new user list to existing store
   */
  subscribeToUserList = async subscribeToMore => {
    subscribeToMore({
      document: NEW_USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newUser = subscriptionData.data.users.node;

        const deletedUser = subscriptionData.data.users.previousValues;

        // console.log("---prev", prev.users);
        // console.log("---new-data", subscriptionData.data.users);

        // console.log("---new-user", newUser);
        // console.log(
        //   "---deleted-user",
        //   subscriptionData.data.users.previousValues.login
        // );

        if (newUser !== null) {
          // TODO: check if it's alright to use slice here
          return prev.users.length >= 5
            ? Object.assign({}, prev, {
                users: [newUser, ...prev.users.slice(0, -1)]
              })
            : Object.assign({}, prev, {
                users: [newUser, ...prev.users]
              });
        }

        if (deletedUser !== null) {
          const newUsers = prev.users.filter(object => {
            return object.login !== deletedUser.login;
          });
          return Object.assign({}, prev, { users: [...newUsers] });
        }
      }
    });
  };

  render() {
    return (
      <div>
        <FormWrapper>
          <UserForm />
        </FormWrapper>
        <Query query={GET_USERS} variables={this.state.queryVariables}>
          {({
            loading,
            error,
            data,
            networkstatus,
            subscribeToMore,
            fetchMore
          }) => {
            if (networkstatus === 4) return <h1>Refetching!</h1>;
            if (loading) return <BallsSpinner />;
            if (error) return `Error: ${error}`;

            return (
              <div>
                <UserList
                  users={data.users}
                  subscribeToUserList={() =>
                    this.subscribeToUserList(subscribeToMore)
                  }
                  queryVariables={this.state.queryVariables}
                />
                <Pagination
                  onLoadMore={fetchVariables =>
                    this.loadMoreUsers(fetchMore, fetchVariables)
                  }
                  queryVariables={this.state.queryVariables}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }

  /**
   * loadMoreUsers
   * @method
   * @summary fetch new data from the API
   * @param {Function} fetchMore
   *        is provided by GET_USERS Query
   * @param {Object} fetchVariables
   *        comes from Pagination component
   * @returns {Object}
   *        assignes new user list to existing store
   */
  loadMoreUsers(fetchMore, fetchVariables) {
    this.setState({ queryVariables: fetchVariables });
    fetchMore({
      variables: fetchVariables,
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("---prev", prev);
        console.log("---fetch-more", fetchMoreResult);
        // if (!fetchMoreResult) return prev;
        const newUsers = fetchMoreResult.users.filter(newUser => {
          return prev.users.filter(prevUser => {
            return newUser.login === prevUser.login;
          });
        });
        return Object.assign({}, prev, {
          users: [...newUsers]
        });
      }
    });
  }
}
