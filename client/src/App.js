import logo from './logo.svg';
import './App.css';
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AddData from './AddData';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Data</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/add" element={<AddData />} />
      </Routes>
    </Router>
  );
}

export default App;
