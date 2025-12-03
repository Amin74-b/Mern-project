import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Item name is required');
      return;
    }

    try {
      setError('');
      const response = await axios.post(`${API_URL}/items`, formData);
      setItems([...items, response.data]);
      setFormData({ name: '', description: '' });
    } catch (err) {
      setError('Failed to create item: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Application</h1>
        <p>Hosted on Microsoft Azure</p>
      </header>

      <main className="App-main">
        <section className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Item name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Item description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <button type="submit" className="btn-primary">
              Add Item
            </button>
          </form>
        </section>

        {error && <div className="error-message">{error}</div>}

        <section className="items-section">
          <h2>Items List</h2>
          {loading && <p className="loading">Loading items...</p>}
          {!loading && items.length === 0 && <p className="empty">No items yet. Create one!</p>}
          {!loading && items.length > 0 && (
            <div className="items-grid">
              {items.map(item => (
                <div key={item._id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <small>{new Date(item.createdAt).toLocaleDateString()}</small>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>MERN Stack | MongoDB, Express, React, Node.js | Deployed on Azure</p>
      </footer>
    </div>
  );
}

export default App;
