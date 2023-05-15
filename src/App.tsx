import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


const BASE_URL = 'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?';
const URL_1M = BASE_URL + 'symbols=US1M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_2M = BASE_URL + 'symbols=US2M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_3M = BASE_URL + 'symbols=US3M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_6M = BASE_URL + 'symbols=US6M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_1Y = BASE_URL + 'symbols=US1Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';

const URLS: Array<string> = [URL_1M, URL_2M, URL_3M, URL_6M, URL_1Y];

interface Bond {
  name: string;
  apy: string;
}

function App() {
  const [data, setData] = useState<Bond[]>([]);

  useEffect(() => {
    Promise.all(
      URLS.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(data => ({
            apy: data.FormattedQuoteResult.FormattedQuote[0].last,
            name: data.FormattedQuoteResult.FormattedQuote[0].shortName
          }))
      )
    )
      .then(results => setData(results))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>APY</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, apy }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{apy}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}




export default App;
