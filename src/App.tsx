import React, { useEffect, useState } from 'react';


const BASE_URL = 'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?';
const URL_1M = BASE_URL + 'symbols=US1M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_2M = BASE_URL + 'symbols=US2M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_3M = BASE_URL + 'symbols=US3M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_6M = BASE_URL + 'symbols=US6M&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_1Y = BASE_URL + 'symbols=US1Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_2Y = BASE_URL + 'symbols=US2Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';
const URL_5Y = BASE_URL + 'symbols=US5Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1';

const URLS: Array<string> = [URL_1M, URL_2M, URL_3M, URL_6M, URL_1Y, URL_2Y, URL_5Y];

interface Bond {
  name: string;
  apy: number;
  previous_day: number;
}

function App() {
  const [data, setData] = useState<Bond[]>([]);

  useEffect(() => {
    Promise.all(
      URLS.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(data => ({
            apy: parseFloat(data.FormattedQuoteResult.FormattedQuote[0].last.replace("%", "")),
            name: data.FormattedQuoteResult.FormattedQuote[0].shortName,
            previous_day: parseFloat(data.FormattedQuoteResult.FormattedQuote[0].previous_day_closing.replace("%", "")),
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
              <th>Bond</th>
              <th>APY</th>
              <th>Change</th>
        </thead>
        <tbody>
          {data.map(({ name, apy, previous_day }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{apy.toString() + "%"}</td>
              <td className={`${apy > previous_day ? "up" : "down"}`}>
                {(apy - previous_day).toFixed(3).toString() + "%"}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}




export default App;
