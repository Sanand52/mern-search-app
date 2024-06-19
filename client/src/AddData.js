// src/AddData.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddData() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddData = async () => {
    try {
      const response = await axios.post('/add', { name, description });
      console.log('Data added:', response.data);
      setName('');
      setDescription('');
      alert('Data added successfully');
      navigate('/'); // Redirect to search page after adding data
    } catch (err) {
      console.error(err);
      alert('Failed to add data');
    }
  };

  return (
    <div>
      <h2>Add New Data</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
}

export default AddData;
