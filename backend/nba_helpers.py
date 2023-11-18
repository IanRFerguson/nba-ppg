from nba_api.stats.static import teams
import pandas as pd
from datetime import datetime

##########


def get_all_teams_metadata():
    """
    Queries NBA stats API and returns list
    of team metadata

    ```
    {
        'id': 1610612752,
        'full_name': 'New York Knicks',
        'abbreviation': 'NYK',
        'nickname': 'Knicks',
        'city': 'New York',
        'state': 'New York',
        'year_founded': 1946
    }
    ```
    """

    # Call NBA stats API
    team_metadata = teams.get_teams()

    return team_metadata


def get_team_ppg(team_initials: str):
    """
    Leverages pandas to scrape basketball reference
    and return a list of dictionaries
    """

    base_url = "https://www.basketball-reference.com/teams/{}/{}_games.html"

    # Determine which part of the season we're in
    current_month = datetime.now().strftime("%m")
    nba_season = get_nba_season(month=current_month)

    # Apply string formatting to url
    url = base_url.format(team_initials, nba_season)

    # Read HTML table as DF
    team_data = pd.read_html(url)[0]

    # Clean up relevant columns
    team_data.rename(
        columns={
            "Unnamed: 7": "status",
            "Tm": "points",
            "Opp": "opponent_points",
        },  # noeq
        inplace=True,
    )  # noeq

    # Cast all to lowercase
    team_data.columns = [x.lower() for x in team_data.columns]

    # Build string of display information
    team_data["build_string"] = team_data.apply(build_cursor_string, axis=1)

    # Reduce to relevant columns
    team_data = team_data.loc[:, ["points", "opponent_points", "build_string"]]

    return team_data.to_dict("records")


def get_nba_season(month: str):
    """
    Determines which part of the season we're in
    """

    base_year = int(datetime.now().strftime("%Y"))

    if int(month) in [8, 9, 10, 11, 12]:
        return base_year + 1

    return base_year


def convert_nba_date_to_utc(date: str):
    """
    Converts string date representation to datetime
    """

    return datetime.strptime(date, "%a, %b %d, %Y")


def build_cursor_string(df: pd.DataFrame):
    """
    Creates a new string out of many columns. This is
    what the user will see when they hover over
    the D3 lineplot
    """

    base = "{} against the {} on {} [{} to {}]"

    return base.format(
        df["status"],
        df["opponent"],
        df["date"],
        df["points"],
        df["opponent_points"],  # noeq
    )
