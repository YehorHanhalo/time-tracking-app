import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { SnackbarProvider } from 'notistack'
import App from './App';
import './index.css'

const client = new ApolloClient({
  uri: 'https://graph.proworkflow.com/DevTestyehor/',
  headers: {
    Authorization: `${process.env.REACT_APP_AUTH}`,
  },
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
