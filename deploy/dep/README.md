# Microservice Approach

First pass at this deployment used two concurrent services orchestrated via Docker compose ... the networking juice wasn't worth the squeeze so I moved back to a single Dockerfile to serve the React frontend via the Flask server.