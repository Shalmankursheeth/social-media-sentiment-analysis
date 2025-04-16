const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/saveData', (req, res) => {
    console.log('Received POST request at /saveData');
    const { originalPostText, emotionLevel, modifiedPostText } = req.body;

    // Create a child process to run the Python script
    const pythonProcess = spawn('python', ['ml_script.py']);

    // Send data to Python script
    pythonProcess.stdin.write(JSON.stringify({ text: originalPostText }) + '\n');
    pythonProcess.stdin.end();

    // Collect result from Python script
    let predictionResult = '';
    pythonProcess.stdout.on('data', (data) => {
        predictionResult += data.toString();
    });

    // Handle the end of the process
    pythonProcess.on('close', (code) => {
        const prediction = JSON.parse(predictionResult).prediction;

        // Create a CSV string
        // Create a CSV string
const csvData = `${originalPostText},${emotionLevel},${modifiedPostText},${prediction}\n`;

        // Append the data to the CSV file
        fs.appendFile('data.csv', csvData, (err) => {
            if (err) {
                console.error('Error writing to CSV:', err);
                res.status(500).send('Error saving data');
            } else {
                console.log('Data saved successfully');
                // Send the prediction in the response
                res.status(200).json({ prediction });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
