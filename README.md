# NBA Points Per Game Visualization
This is a full-stack application to query Basketball Reference and visualize how many points a team has scored

```
# Run in docker
docker compose up --build -d

# Run microservices separately
cd backend && flask run

# In a separate terminal...
cd frontend && npm run start
```

## Flask Backend
* This is a very simple API to scrape data from Basketball Reference, clean it, and return it in a JSON object

## React Frontend
* This application receives data from the API and visualizes it in a D3 line chart

## TODO List
* Sure would be nice to use an API rather than web scraping, but we'll do what we can