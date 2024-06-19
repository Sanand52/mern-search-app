const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://root:root@cluster0.omfwbwy.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema
const DataSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Data = mongoose.model('Data', DataSchema);

// Routes
app.post('/add', async (req, res) => {
    const { name, description } = req.body;
    try {
      const newData = new Data({ name, description });
      await newData.save();
      res.json(newData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add data' });
    }
  });

// Search endpoint
app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
      const results = await Data.find({
        name: new RegExp(query, 'i'),
      });
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
