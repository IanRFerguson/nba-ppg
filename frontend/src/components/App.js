import logo from '../static/logo.svg';
import '../static/App.css';
import { useEffect, useState } from 'react';
import { fetchTeamData } from '../utils/getTeamStats';

function App() {

  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    fetch("get_team_names")
      .then(
        response => response.json()
          .then(data => {
            setTeamNames(data)
          }))
  }, []);

  let handleTeamChange = (e) => {
    let teamData = fetchTeamData(e.target.value);
  }

  return (
    <div className="App">
      <div className="teamSelection" id="teamSelection">
        <h1>NBA Points Per Game</h1>
        <select onChange={handleTeamChange}>
          <option value="nobody">Pick Your Team</option>
          {
            teamNames.map((team) =>
              <option value={team.abbreviation}>
                {team.full_name}
              </option>)
          }
        </select>
      </div>
      <div></div>
    </div>
  );
}

export default App;
