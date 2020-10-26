import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

require('../node_modules/jquery/dist/jquery');
require('../node_modules/bootstrap/dist/js/bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});

// client.query({
//   query: gql`
//   {
//     continent(code: "AF") {
//       name,
//       countries {
//         capital
//         name
//         languages{name}
//         states {
//           name
//         }
//       }
//     }
//   }
//   `
// }).then(res => {
//   console.log(res);
// });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider  client={client}>
      <App />
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.unregister();
