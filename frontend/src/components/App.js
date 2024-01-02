import '../static/App.css';
import { useEffect, useState } from 'react';
import { fetchTeamData } from '../utils/getTeamStats';
import { drawChart, clearChart } from '../utils/chart';
import { TeamLogo } from './TeamLogo';


function App() {
  // Team names are pulled in from an API call, so
  // we'll default to an empty array before that call is made
  const [teamNames, setTeamNames] = useState([]);

  // No TeamLogo applied until a team name is selected in the dropdown
  const [TL, setTeamLogo] = useState('');

  // Call Flask backend to populate team names array
  useEffect(() => {
    fetch("get_team_names")
      .then(
        response => response.json()
          .then(data => {
            setTeamNames(data)
          }))
  }, []);


  let handleTeamChange = (e) => {
    // Clear chart from div
    clearChart();

    // Update team logo when the team name changes
    setTeamLogo(TeamLogo(e.target.value))

    // Call Flask API and render chart
    fetchTeamData(e.target.value)
      .then(
        data => { drawChart(data) }
      )
  }


  return (
    <div className="App">
      <div className="teamSelection" id="teamSelection">
        <h1>NBA Points Per Game</h1>
        <select onChange={handleTeamChange}>
          <option value="nobody">Pick Your Team</option>
          {
            // Here we'll pull the abbreviation : team names
            // out of the object derived from the API call
            teamNames.map((team) =>
              <option value={team.abbreviation}>
                {team.full_name}
              </option>)
          }
        </select>
      </div>
      <div id="teamLogo">
        {TL}
      </div>
      <div id="teamChart"></div>
    </div>
  );
}


export default App;
