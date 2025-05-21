const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get('https://instagram-reels-downloader-api.p.rapidapi.com/download', {
      params: { url },
      headers: {
        'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com',
        'x-rapidapi-key': '3641222daamsh414c9dca6784a8ep1f9b60jsn92b32450ebbf'
      }
    });

    if (response.data && response.data.video) {
      res.json({ success: true, videoUrl: response.data.video });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
