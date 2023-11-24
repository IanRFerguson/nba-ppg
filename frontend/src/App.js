import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    fetch("get_team_names")
      .then(
        response => response.json()
          .then(data => {
            setTeamNames(data)
          })
      )
  }, []);

  let draw = (e) => {
    console.log("DRAW")
  }

  return (
    <div className="App">
      <div className="teamSelection" id="teamSelection">
        <h1>NBA Points Per Game</h1>
        <select onChange={draw}>
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
