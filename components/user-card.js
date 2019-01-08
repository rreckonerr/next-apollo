import React, { Component } from "react";
import styled from "styled-components";
import { TextButton, hex2Rgba } from "../styles";

const UserCardWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;

  font-size: 1em;

  background-color: ${({ theme }) => theme.color.postBackground};
  border-bottom: 1px solid
    ${({ theme }) => hex2Rgba(theme.color.primaryLight, 0.3)};

  &:hover {
    background-color: ${({ theme }) => hex2Rgba(theme.color.secondary, 0.1)};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 1em;
  padding: 0.6em 0;
  white-space: nowrap;

  fill: ${({ theme }) => theme.color.secondary};
`;

const MainFieldWrapper = styled.div`
  margin: 0 1em;
  width: 20%;
`;

const SecondaryFieldsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: center;
`;

const Info = styled.div`
  width: 35%;
  text-align: center;
  `;

export default class UserCard extends Component {
  render() {
    const { user, onUserDelete } = this.props;

    return (
      <div>
        <UserCardWrapper>
          <LogoWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </LogoWrapper>
          <MainFieldWrapper>
            <Title>
              {user.login.length > 70
                ? user.login.substring(0, 70) + "..."
                : user.login}
            </Title>
          </MainFieldWrapper>
          <SecondaryFieldsWrapper>
            <Info>{user.fullName}</Info>
            <Info>{user.id}</Info>
            <TextButton small secondary onClick={() => onUserDelete()}>
              Delete
            </TextButton>
          </SecondaryFieldsWrapper>
        </UserCardWrapper>
      </div>
    );
  }
}
