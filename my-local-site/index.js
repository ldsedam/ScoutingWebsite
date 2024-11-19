const express = require('express');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');  // Importing xlsx to parse Excel files
const app = express();

console.log('Starting server...');

// Set up middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads, storing files in the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

let scheduleData = [];  // Store uploaded schedule data
let uniqueTeams = [];   // Store unique team numbers

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve upload.html
app.get('/upload.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// Route to reset local storage data
app.get('/reset-data', (req, res) => {
  res.send('<script>localStorage.removeItem("parsedData");</script>');
});

// Route to handle scouting data upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        res.json({
            message: 'File uploaded successfully!',
            data: sheetData,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process the file' });
    }
});

// Route to handle schedule upload
app.post('/upload-schedule', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Clear old schedule data
        scheduleData = [];
        uniqueTeams = [];

        // Read the uploaded Excel file
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Process the schedule and collect unique team numbers
        sheetData.forEach(row => {
            const teams = [
                row["Red 1"], row["Red 2"], row["Red 3"],
                row["Blue 1"], row["Blue 2"], row["Blue 3"]
            ];

            teams.forEach(team => {
                if (team && !uniqueTeams.includes(team)) {
                    uniqueTeams.push(team);
                }
            });
        });

        // Sort the unique teams numerically
        uniqueTeams.sort((a, b) => a - b);

        // Save the schedule data and unique teams
        scheduleData = sheetData;

        res.json({
            message: 'Schedule uploaded and processed successfully!',
            schedule: scheduleData,
            teams: uniqueTeams
        });
    } catch (error) {
        console.error('Error processing schedule:', error);
        res.status(500).json({ error: 'Failed to process the schedule' });
    }
});

// Route to serve schedule.html
app.get('/schedule.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
});

// Route to fetch schedule data and unique teams
app.get('/get-schedule', (req, res) => {
  res.json({
    schedule: scheduleData,
    teams: uniqueTeams
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
