import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo'
// import { GRAPHQL_URL, WS_URL } from '../configs'

const GRAPHQL_URL = 'http://10.10.10.139:4000';
const WS_URL = 'ws://10.10.10.139:4000';

export default withApollo(({ headers = {} }) => {
  const ssrMode = !process.browser

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL
  })

  const wsLink = !ssrMode && new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: headers.authorization
      }
    }
  })

  const contextLink = setContext(
    async () => ({
      headers: {
        authorization: headers.authorization
      }
    })
  )

  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  )

  let link = ApolloLink.from([errorLink, contextLink, httpLink])

  if (!ssrMode) {
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      link
    )
  }

  const cache = new InMemoryCache({
    dataIdFromObject: ({ id, __typename }) =>
      id && __typename ? __typename + id : null
  })

  return new ApolloClient({ link, ssrMode, cache })
})