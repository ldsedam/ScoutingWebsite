// upload.js

// Existing code for scouting data upload...
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    
    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const newData = await response.json();
        console.log('Success:', newData);

        // Retrieve existing data from localStorage
        const existingData = JSON.parse(localStorage.getItem('parsedData')) || [];
        
        // Append new data to existing data
        const combinedData = existingData.concat(newData.data);

        // Save the combined data back to localStorage
        localStorage.setItem('parsedData', JSON.stringify(combinedData));

        // Redirect to the Data page
        window.location.href = '/data.html';

    } catch (error) {
        console.error('Error:', error);
    }
});

// New code for schedule upload...
document.getElementById('schedule-upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('schedule-file-input');

    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert('Please select a schedule file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload-schedule', {
            method: 'POST',
            body: formData,
        });

        const newScheduleData = await response.json();
        console.log('Success:', newScheduleData);

        // Store schedule data in localStorage
        localStorage.setItem('scheduleData', JSON.stringify(newScheduleData.data));

        // Redirect to the Schedule page
        window.location.href = '/schedule.html';

    } catch (error) {
        console.error('Error:', error);
    }
});
