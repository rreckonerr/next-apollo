import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import UserCard from "./UserCard";
import UserForm from "./UserForm";

const GET_USERS = gql`
  query {
    users(orderBy: createdAt_DESC, first: 5) {
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

class UserList extends Component {
  subscribeToNewUsers = async subscribeToMore => {
    subscribeToMore({
      document: NEW_USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("--prev-users", prev.users);
        // console.log('--subscriptionData', subscriptionData)

        if (!subscriptionData.data) return prev;

        const newUser = subscriptionData.data.users.node;

        console.log("---prev", prev);
        console.log("---subs-data", subscriptionData);

        // Remove last item from the view array after adding a new one
        // const filteredUsers = prev.users;
        // filteredUsers.pop();

        return newUser !== null
          ? Object.assign({}, prev, {
              //   users: [newUser, ...filteredUsers],
              users: [newUser, ...prev.users]
            })
          : null;
      }
    });
  };

  render() {
    return (
      <div>
        <UserForm />
        <Query query={GET_USERS}>
          {({
            loading,
            error,
            data,
            refetch,
            networkstatus,
            subscribeToMore
          }) => {
            if (networkstatus === 4) return <h1>Refetching!</h1>;
            if (loading) return <h1>Loading!</h1>;
            if (error) return `Error: ${error}`;

            console.log("data", data);

            return (
              <div>
                <button onClick={() => refetch()}>Refetch that!</button>
                <UserListWithData
                  data={data}
                  subscribeToNewUsers={() =>
                    this.subscribeToNewUsers(subscribeToMore)
                  }
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

class UserListWithData extends Component {
  componentDidMount() {
    this.props.subscribeToNewUsers();
  }

  render() {
    const { data } = this.props;
    return data.users.map(user => <UserCard key={user.id} user={user} />);
  }
}

export default UserList;
