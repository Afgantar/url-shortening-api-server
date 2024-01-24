const express = require('express');
const cors = require('cors');
const axios = require('axios')
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_ORIGIN as string],
  methods: ["POST", "GET"],
  credentials: true
}));

axios.defaults.withCredentials = true;

app.post('/api/post', async (req, res) => {
  try {
    const response = await axios.post(process.env.CLEAN_URI_API as string, {
      url: req.body.url,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
