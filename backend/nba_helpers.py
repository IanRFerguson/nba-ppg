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
    team_metadata = teams.get_teams()

    return team_metadata


def get_team_ppg(team_initials: str):
    """
    Leverages pandas to scrape basketball reference
    and return a list of dictionaries
    """

    base_url = "https://www.basketball-reference.com/teams/{}/{}_games.html"

    current_month = datetime.now().strftime("%m")
    nba_season = get_nba_season(month=current_month)

    url = base_url.format(team_initials, nba_season)

    team_data = pd.read_html(url)[0].loc[:, ["Date", "Tm"]]
    team_data.columns = ["date", "points"]
    team_data["date"] = team_data["date"].apply(lambda x: convert_nba_date_to_utc(x))

    return team_data.to_dict("records")


def get_nba_season(month: str):
    """
    Determines which part of the season we're in
    """

    base_year = int(datetime.now().strftime("%Y"))

    if int(month) in [8, 9, 10, 11, 12]:
        return base_year

    return base_year + 1


def convert_nba_date_to_utc(date: str):
    """
    Converts string date representation to datetime
    """

    return datetime.strptime(date, "%a, %b %d, %Y")
