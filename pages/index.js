import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import UserList from "../components/user-list";

import Pagination from "../components/pagination";

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
          if (loading)
            return (
              <svg
                width="200px"
                height="200px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                className="lds-ball2"
                style={{ background: "none" }}
              >
                <g
                  ng-attr-transform="translate(0,{{config.dy}})"
                  transform="translate(0,-7.5)"
                >
                  <circle
                    cx="50"
                    ng-attr-cy="{{config.cy}}"
                    r="5.35876"
                    ng-attr-fill="{{config.c1}}"
                    cy="41"
                    fill="#3be8b0"
                    transform="rotate(290.701 50 50)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      calcMode="linear"
                      values="0 50 50;360 50 50"
                      keyTimes="0;1"
                      dur="1s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      calcMode="spline"
                      values="0;15;0"
                      keyTimes="0;0.5;1"
                      dur="1"
                      keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="50"
                    ng-attr-cy="{{config.cy}}"
                    r="9.64124"
                    ng-attr-fill="{{config.c2}}"
                    cy="41"
                    fill="#1aafd0"
                    transform="rotate(470.701 50 50)"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      calcMode="linear"
                      values="180 50 50;540 50 50"
                      keyTimes="0;1"
                      dur="1s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      calcMode="spline"
                      values="15;0;15"
                      keyTimes="0;0.5;1"
                      dur="1"
                      keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </svg>
            );
          if (error) return `Error: ${error}`;
          console.log("---data", data);
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
