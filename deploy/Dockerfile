# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json .
COPY frontend/src /app/src
COPY frontend/public /app/public
RUN yarn install
RUN yarn build



# Build step #2: build the API with the client as static files
FROM python:3.9
WORKDIR /app
COPY --from=build-step /app/build /app/build

RUN mkdir /app/backend
COPY backend/* /app/backend
WORKDIR /app/backend/
RUN pip install -r requirements.txt
ENV FLASK_ENV production

EXPOSE 3000
CMD ["gunicorn", "-b", ":3000", "wsgi"]