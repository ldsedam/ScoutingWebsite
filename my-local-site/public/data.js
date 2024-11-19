// data.js    

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const teamSelect = document.getElementById('team-select'); // Ensure the dropdown exists in HTML
    const storedData = localStorage.getItem('parsedData');

    // Function to update the table with filtered or all data
    function updateTable(data) {
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th style="border: 1px solid #ddd; padding: 8px;">EVENT</th>
            <th style="border: 1px solid #ddd; padding: 8px;">MATCH LEVEL</th>
            <th style="border: 1px solid #ddd; padding: 8px;">MATCH NUMBER</th>
            <th style="border: 1px solid #ddd; padding: 8px;">SCOUT</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TABLET</th>
            <th style="border: 1px solid #ddd; padding: 8px;">STARTING POS</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TEAM</th>
            <th style="border: 1px solid #ddd; padding: 8px;">AUTO - MOVE</th>
            <th style="border: 1px solid #ddd; padding: 8px;">AUTO - SPEAKER</th>
            <th style="border: 1px solid #ddd; padding: 8px;">AUTO - AMP</th>
            <th style="border: 1px solid #ddd; padding: 8px;">AUTO - TRAP</th>
            <th style="border: 1px solid #ddd; padding: 8px;">AUTO - MISSED</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - COOP</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - GROUND</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - SOURCE</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - SPEAKER</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - AMPED SPEAKER</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - AMP</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - TRAP</th>
            <th style="border: 1px solid #ddd; padding: 8px;">TELE - MISSED</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - CLIMB</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - CLIMB FAIL</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - PARK</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - NONE</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - HARMONY</th>
            <th style="border: 1px solid #ddd; padding: 8px;">END - TRAP</th>
        `;
        table.appendChild(headerRow);

        // Populate the table with data
        data.forEach(entry => {
            const event = entry["Event"];          // Event column
            const matchLevel = entry["Match LVL"]; // Match Level column
            const matchNumber = entry["Match Number"]; // Match Number column
            const scout = entry["Scout"];  // Scout column
            const tablet = entry["Tablet"]; // Tablet column
            const startingPos = entry["starting pos"]; // Starting Pos column
            const team = entry["Team"];            // Team column
            const autoMove = entry["AUTO_Left_Zone"] // Auto Move Points
            const autoSpeaker = entry["AUTO_Speaker"];  // Auto Speaker Points
            const autoAmp = entry["AUTO_Amp"]; // Auto Amp Points
            const autoTrap = entry["AUTO_Trap"]; // Auto Trap Points
            const autoMissed = entry["AUTO_Missed"]; // Auto Missed Shots
            const teleCoop = entry["TELE_Coopertition"]; // Tele CoOp Points
            const teleGround = entry["TELE_Ground"]; // Notes picked up from ground
            const teleSource = entry["TELE_Source"]; // Notes picked up from source
            const teleSpeaker = entry["TELE_Speaker"]; // Notes scored in speaker
            const teleAmpSpeaker = entry["TELE_Amped_Speaker"]; // Notes scored in amped speaker
            const teleAmp = entry["TELE_AMP"]; //Notes scored in amp
            const teleTrap = entry["TELE_Trap"]; //Notes scored in trap in tele
            const teleMissed = entry["TELE_Missed"]; //Notes missed in speaker
            const endClimb = entry["ENDGAME_Onstage"]; //Did the robot climb
            const endClimbFail = entry["ENDGAME_Failed_Climb"]; //Did the robot fail to climb but try
            const endPark = entry["ENDGAME_Parked"]; //Did the robot park
            const endNone = entry["ENDGAME_None"]; //Did the robot do nothing
            const endHarmony = entry["ENDGAME_Harmony"]; // Did the robot harmonize
            const endTrap = entry["ENDGAME_Trap"]; // Did the robot score in the trap in end

            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${event}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${matchLevel}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${matchNumber}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${scout}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${tablet}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${startingPos}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${team}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${autoMove}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${autoSpeaker}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${autoAmp}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${autoTrap}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${autoMissed}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleCoop}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleGround}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleSource}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleSpeaker}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleAmpSpeaker}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleAmp}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleTrap}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${teleMissed}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endClimb}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endClimbFail}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endPark}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endNone}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endHarmony}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${endTrap}</td>
            `;
            table.appendChild(row);
        });

        output.innerHTML = '';
        output.appendChild(table);
    }

    if (storedData) {
        const allData = JSON.parse(storedData);

        // Clear existing options except the first one (All Teams)
        while (teamSelect.options.length > 1) {
            teamSelect.remove(1);
        }

         // Populate dropdown with unique team values
        const uniqueTeams = [...new Set(allData.map(entry => entry.Team))];
        uniqueTeams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamSelect.appendChild(option);
        });

        updateTable(allData);

        // Event listener for team filtering
        teamSelect.addEventListener('change', (e) => {
            const selectedTeam = e.target.value.trim().toLowerCase();
            if (selectedTeam === "") {
                updateTable(allData); // Show all data if no team is selected
            } else {
                const filteredData = allData.filter(entry => {
                    return entry.Team.toString().trim().toLowerCase().includes(selectedTeam);
                });
                updateTable(filteredData);
            }
        });
    } else {
        output.innerHTML = '<p>No data available. Please upload a file first.</p>';
    }

    document.getElementById('reset-button').addEventListener('click', () => {
        localStorage.removeItem('parsedData');
        output.innerHTML = '<p>Data has been reset. Please upload a new file.</p>';
        location.reload();
    });
});