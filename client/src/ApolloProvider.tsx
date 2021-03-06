import React from 'react';
import { 
    ApolloClient, 
    ApolloProvider, 
    InMemoryCache, 
    HttpLink, 
    ApolloLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'

import App from './App';


const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const authHttp = authLink.concat(httpLink)

const link = ApolloLink.from([errorLink, authHttp])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
