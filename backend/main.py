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

    from nba_helpers import get_team_ppg

    team_stats = get_team_ppg(team_initials=team_initials)

    return jsonify(team_stats)