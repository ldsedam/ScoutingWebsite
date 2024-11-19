document.addEventListener('DOMContentLoaded', () => {
    const scheduleOutput = document.getElementById('schedule-output');
    const teamSelect = document.getElementById('team-select');
    const matchSelect = document.getElementById('match-select');
    const red1 = document.getElementById('red1');
    const red2 = document.getElementById('red2');
    const red3 = document.getElementById('red3');
    const blue1 = document.getElementById('blue1');
    const blue2 = document.getElementById('blue2');
    const blue3 = document.getElementById('blue3');

    // Check if all required elements are present
    if (!scheduleOutput || !teamSelect || !matchSelect || !red1 || !red2 || !red3 || !blue1 || !blue2 || !blue3) {
        console.error('One or more required DOM elements are missing');
        return;
    }

    fetch('/get-schedule')
        .then(response => response.json())
        .then(data => {
            const { schedule, teams } = data;

            // Sort teams in numerical order
            teams.sort((a, b) => a - b);

            // Populate team dropdown
            teamSelect.innerHTML = '<option value="all">All Teams</option>';
            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team;
                option.textContent = team;
                teamSelect.appendChild(option);
            });

            console.log('Schedule Data:', schedule);

            // Populate match dropdown
            matchSelect.innerHTML = '<option value="">Select a Match</option>';
            schedule.forEach((match, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = match['Match'];
                matchSelect.appendChild(option);
            });

            // Create a table for the schedule
            function updateTable(data) {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';

                const headerRow = document.createElement('tr');
                headerRow.innerHTML = `
                    <th style="border: 1px solid #ddd; padding: 8px;">Match</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Start Time</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Red 1</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Red 2</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Red 3</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Blue 1</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Blue 2</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Blue 3</th>
                `;
                table.appendChild(headerRow);

                // Populate the table with schedule data
                data.forEach(entry => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry.Match}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Start Time"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Red 1"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Red 2"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Red 3"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Blue 1"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Blue 2"]}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${entry["Blue 3"]}</td>
                    `;
                    table.appendChild(row);
                });

                scheduleOutput.innerHTML = '';
                scheduleOutput.appendChild(table);
            }

            // Update table initially
            updateTable(schedule);

            // Event listener for filtering by team
            teamSelect.addEventListener('change', (e) => {
                const selectedTeam = e.target.value;
                if (selectedTeam === 'all') {
                    updateTable(schedule);
                } else {
                    const filteredData = schedule.filter(entry => 
                        [entry["Red 1"], entry["Red 2"], entry["Red 3"], entry["Blue 1"], entry["Blue 2"], entry["Blue 3"]].includes(parseInt(selectedTeam))
                    );
                    updateTable(filteredData);
                }
            });

            // Event listener for match selection
            matchSelect.addEventListener('change', function () {
                const selectedMatch = schedule[this.value];
                if (selectedMatch) {
                    // Populate Red teams
                    red1.textContent = selectedMatch['Red 1'] || '---';
                    red2.textContent = selectedMatch['Red 2'] || '---';
                    red3.textContent = selectedMatch['Red 3'] || '---';

                    // Populate Blue teams
                    blue1.textContent = selectedMatch['Blue 1'] || '---';
                    blue2.textContent = selectedMatch['Blue 2'] || '---';
                    blue3.textContent = selectedMatch['Blue 3'] || '---';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching schedule:', error);
            scheduleOutput.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        });
});