const express = require("express");
const cors = require("cors");
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

// Enable CORS for http://localhost:3000
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Handle preflight requests
app.options('/predict', cors());

// Predict endpoint
app.post('/predict', (req, res) => {
    try {
        const { food_name } = req.body;
        console.log("Received food name:", food_name);

        const pythonProcess = spawn('python', ['predict.py', food_name], {
            env: { ...process.env, TF_ENABLE_ONEDNN_OPTS: '0', TF_CPP_MIN_LOG_LEVEL: '3' }
        });

        let dataBuffer = '';
        let errorBuffer = '';

        pythonProcess.stdout.on('data', (data) => {
            dataBuffer += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorBuffer += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python process exited with code ${code}: ${errorBuffer}`);
                return res.status(500).json({ error: 'Prediction failed', details: errorBuffer });
            }
            try {
                // Trim any extra characters and parse JSON
                dataBuffer = dataBuffer.trim();
                const prediction = JSON.parse(dataBuffer);
                res.json({ prediction });
            } catch (err) {
                console.error('Failed to parse prediction:', err);
                console.error('Raw data:', dataBuffer);
                res.status(500).json({ error: 'Failed to parse prediction', details: err.message, rawData: dataBuffer });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running at port : " + PORT));