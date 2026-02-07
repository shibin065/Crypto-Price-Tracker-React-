import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "inr",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCrypto(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cryptocurrency data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Circulating Supply</th>
              <th>Volume (24hrs)</th>
            </tr>
          </thead>

          <tbody>
            {crypto
              .filter((coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>

                  <td className="logo">
                    <img src={coin.image} alt={coin.name} width="30" />
                    <p>{coin.name}</p>
                  </td>

                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>₹{coin.market_cap.toLocaleString()}</td>
                  <td>₹{coin.current_price.toLocaleString()}</td>
                  <td>{coin.circulating_supply.toLocaleString()}</td>
                  <td>₹{coin.total_volume.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
