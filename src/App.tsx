import React, { useState, useEffect } from 'react';
import { Container, Center } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider,   NormalizedCacheObject } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { Route, Switch } from "react-router-dom";
import SearchBar from './Components/SearchBar/SearchBar';
import ProjectsList from './Components/ProjectsList/ProjectList';
import './App.css';

const App: React.FC = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
      setClient(
        new ApolloClient({
          uri: 'https://gitlab.com/api/graphql',
          cache,
        }),
      );
    }

    init().catch(console.error);
  }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <SearchBar />
      <Container maxW='container.md' className="main-content">
        <Switch>
          <Route path="/" exact>
            <Center fontSize="18px" mt="36px">
              Search for a project.
            </Center>
          </Route>
          <Route path="/results/:searchTerm" render={() => <ProjectsList />} />
        </Switch>
      </Container>
    </ApolloProvider>
  );
}

export default App;
