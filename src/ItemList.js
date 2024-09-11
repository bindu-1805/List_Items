// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemList.css'; 

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setItems(response.data.slice(0, 10)); // Get only the first 10 items
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items: {error.message}</p>;

  return (
    <div className="item-list">
      <h1>Item List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id} className="item">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
