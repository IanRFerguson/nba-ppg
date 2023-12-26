from flask import Flask, jsonify

api = Flask(__name__)


@api.route("/")
def index():
    """
    Landing route, only speaks the truth

    BING BONG
    """
    return "<h1>Knicks by a million</h1>"


@api.route("/get_team_names")
def get_team_names():
    """
    Passes off team names and abbreviations to the
    React frontend
    """

    from nba_helpers import get_all_teams_metadata

    team_names = get_all_teams_metadata()

    return jsonify(team_names)


@api.route("/get_team_stats/<team_initials>")
def get_team_points_per_game(team_initials: str):
    """
    Passes off list of timestamp / points per game
    """

    from nba_helpers import get_team_ppg, get_all_teams_metadata
    from nba_colors import NBA_COLORS

    # NOTE - There are few a team initials mismatches between the NBA API and
    # Basketball Reference ... this handles that discrepancy 
    team_inital_dict = {"BKN": "BRK", "PHX": "PHO", "CHA": "CHO"}

    if team_initials in team_inital_dict.keys():
        team_stats = get_team_ppg(team_initials=team_inital_dict[team_initials])
    else:
        team_stats = get_team_ppg(team_initials=team_initials)

    team_metadata = [
        x for x in get_all_teams_metadata() if x["abbreviation"] == team_initials
    ][0]
    team_colors = NBA_COLORS[team_initials]
    team_metadata["line_color"] = team_colors["line"]
    team_metadata["background_color"] = team_colors["background"]

    output = {"meta": team_metadata, "stats": team_stats}

    return jsonify(output)


if __name__ == "__main__":
    api.run(host="0.0.0.0", port=5000, debug=True)
