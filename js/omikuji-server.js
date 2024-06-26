const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'html')));

app.get('/api/omikuji', async (req, res) => {
    try {
        // OpenAIのAPIを呼び出しておみくじの文章を生成する
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: 'おみくじの内容を生成してください。',
            max_tokens: 60,
            n: 1,
            stop: null,
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });

        const omikujiMessage = response.data.choices[0].text.trim();
        res.json({ message: omikujiMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('おみくじを生成できませんでした。');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
