import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components';
import { hex2Rgba, TextButton, RaisedButton } from "../styles";

const ADD_USER = gql`
  mutation addUser($login: String!, $fullName: String!) {
    addUser(input: { login: $login, fullName: $fullName }) {
      id
    }
  }
`;


const Container = styled.div`
  background-color: white;
  display: inline-block;

  min-width: 400px;
  margin: 1em 0;
  padding: 2em 2em 0.2em 2em;

  border-radius: 0.25rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Form = styled.form`
  margin: 0 auto;
  display: inline-block;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1em 0;
`;

const InputsWrapper = styled.div`
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6em;
  margin: 0.6em 0;

  box-sizing: border-box;
  border: 0.05rem solid ${({ theme }) =>
    hex2Rgba(theme.color.primaryLight, 0.5)};
  border-radius: 0.25rem;
  box-shadow: 0 0.14em 0.25em 0 ${({ theme }) =>
    hex2Rgba(theme.color.primaryLight, 0.5)};

  &:focus {
    outline: none;
    ${"" /* border: none; */}
    border: 0.05rem solid ${({ theme }) =>
      hex2Rgba(theme.color.secondary, 0.5)};
    box-shadow: 0 0.14em 0.25em 0 ${({ theme }) =>
      hex2Rgba(theme.color.secondary, 0.5)};
  }
`;

const InputHelper = styled.span`
  display: block;
  font-size: 75%;
  margin-top: -0.25em;
  margin-bottom: 0.6em;
`;

const FormHeader = styled.h2`
  margin: 0;
  margin-bottom: 1em;
`

export default class UserForm extends Component {
  state = {
    newUserLogin: "",
    newUserName: ""
  };

  render() {
    const { newUserLogin, newUserName } = this.state;

    return (
      <Mutation mutation={ADD_USER}>
        {mutate => (
          <Container>
            <FormHeader>Add new user</FormHeader>
            <Form
              onSubmit={ev => {
                ev.preventDefault();

                mutate({
                  variables: { login: newUserLogin, fullName: newUserName }
                });

                this.setState({
                  newUserLogin: "",
                  newUserName: ""
                });
              }}
            >
              <InputsWrapper>
                <label htmlFor="login-id">Login</label>
                <br />
                <Input
                  id="login-id"
                  type="text"
                  value={newUserLogin}
                  onChange={this.handleNewUserLogin}
                  placeholder="login"
                />
                <InputHelper>
                  * login should be blabla characters and longer
                </InputHelper>
                <br />
                <label htmlFor="name-id">Name</label>
                <br />
                <Input
                  id="name-id"
                  type="text"
                  value={newUserName}
                  onChange={this.handleNewUserName}
                  placeholder="name"
                />
                <br />
              </InputsWrapper>
              <ButtonsWrapper>
                <TextButton type="cancel">Cancel</TextButton>
                <RaisedButton type="submit">Add user</RaisedButton>
              </ButtonsWrapper>
            </Form>
          </Container>
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
