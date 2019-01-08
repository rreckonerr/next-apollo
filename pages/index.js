import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import UserList from "../components/user-list";

import styled from "styled-components";
import { theme, hex2Rgba } from "../styles";

const GET_USERS = gql`
  query users($orderBy: UserOrderByInput!, $first: Int!, $skip: Int) {
    users(orderBy: $orderBy, first: $first, skip: $skip) {
      login
      fullName
      id
    }
  }
`;

// const GET_USERS = gql`
//   query {
//     users(orderBy: createdAt_DESC, first: 5) {
//       login
//       fullName
//       id
//     }
//   }
// `;

const DELETE_USER_MUTATION = gql`
  mutation removeUser($login: String!) {
    removeUser(login: $login) {
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
      <Mutation
        mutation={DELETE_USER_MUTATION}
        // update={(cache, { data }) => {
        //   console.log("---mut-cache", cache);
        //   console.log("---mut-data", data);
        // }}
      >
        {mutate => (
          <Query
            query={GET_USERS}
            variables={{
              orderBy: "createdAt_DESC",
              first: 5
            }}
          >
            {({
              loading,
              error,
              data,
              networkstatus,
              subscribeToMore,
              fetchMore
            }) => {
              if (networkstatus === 4) return <h1>Refetching!</h1>;
              if (loading) return <h1>Loading!</h1>;
              if (error) return `Error: ${error}`;
              console.log('---data', data)
              return (<div>
                  <UserList
                    users={data.users}
                    onUserDelete={({ login }) =>
                      mutate({
                        variables: { login },
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
                    onLoadMore={() => this.loadMoreUsers(fetchMore, data)
                      //   TODO: fix load more behaviour on delete
                      // fetchMore({
                      //   variables: {
                      //     orderBy: "createdAt_DESC",
                      //     first: data.users.length + 5
                      //   },
                      //   updateQuery: (prev, { fetchMoreResult }) => {
                      //     // console.log("---prev", prev);
                      //     // console.log("---fetch-more", fetchMoreResult);
                      //     // if (!fetchMoreResult) return prev;
                      //     const newUsers = fetchMoreResult.users.filter(
                      //       newUser => {
                      //         return prev.users.filter(prevUser => {
                      //           return newUser.login === prevUser.login;
                      //         });
                      //       }
                      //     );
                      //     return Object.assign({}, prev, {
                      //       users: [...newUsers]
                      //     });
                      //   }
                      // })
                    }
                    subscribeToUserList={() =>
                      this.subscribeToUserList(subscribeToMore)
                    }
                  />
                  <h2>Pagination goes here</h2>
                  </div>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }

  loadMoreUsers (fetchMore, data) {
    fetchMore({
      variables: {
        orderBy: "createdAt_DESC",
        first: 5,
        skip: data.users.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("---prev", prev);
        console.log("---fetch-more", fetchMoreResult);
        // if (!fetchMoreResult) return prev;
        const newUsers = fetchMoreResult.users.filter(
          newUser => {
            return prev.users.filter(prevUser => {
              return newUser.login === prevUser.login;
            });
          }
        );
        return Object.assign({}, prev, {
          users: [...newUsers]
        });
      }
    })
  }
}
