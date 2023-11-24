export async function fetchTeamData(team) {
    console.log(`Fetching points scored for ${team}`);

    // Call Flask API
    const response = await fetch(`get_team_stats/${team}`)

    // Render JSON response object
    const stats = await response.json();

    if (stats) {
        console.log(stats)
    }

    return stats
}