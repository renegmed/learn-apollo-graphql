import React, { useState } from 'react';
import ReactDOM from 'react-dom'; 
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/",
  cache: new InMemoryCache()
});
 
function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    
    // the selection is sent to the parent component 
    // via the provided onDogSelected function
    setSelectedDog(target.value);
  }
 
  return(
    <ApolloProvider client={client}>
      <div>
        <h2>Building Query components 🚀</h2> 
        <Dogs />
      </div>
    </ApolloProvider>
  ); 
} 
 
const GET_DOGS = gql`
 query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}
  
ReactDOM.render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>,
  document.getElementById('root')
);

 
