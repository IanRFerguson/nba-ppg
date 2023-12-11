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

    team_stats = get_team_ppg(team_initials=team_initials)
    team_metadata = [
        x
        for x in get_all_teams_metadata()
        if x["abbreviation"] == team_initials  # noeq
    ][0]

    team_colors = NBA_COLORS[team_initials]
    team_metadata["line_color"] = team_colors["line"]
    team_metadata["background_color"] = team_colors["background"]

    output = {"meta": team_metadata, "stats": team_stats}

    return jsonify(output)


if __name__ == "__main__":
    api.run(host="0.0.0.0", port=5001)
