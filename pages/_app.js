import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

import styled, { ThemeProvider } from "styled-components";
import { theme, hex2Rgba } from "../styles";
import Nav from '../components/main-nav';


const Wrapper = styled.div`
  background-color: ${({ theme }) => hex2Rgba(theme.color.primaryLight, 0.1)};
  min-height: 100vh;
`;

const MainContent = styled.main`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 60em;
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <Wrapper>
              <Nav />
              <MainContent>
                <Component {...pageProps} />
              </MainContent>
            </Wrapper>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
