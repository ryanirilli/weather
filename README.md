## Live demo

http://ryan-irilli.com/weather 

## Description

Uses https://developer.forecast.io/ api to display current weather and 
5 day forecast

## Install

At the time of publishing, I am using `Node 5.4.1`. I highly recommend 
using [nvm](https://github.com/creationix/nvm) to manage your version 
of Node.

```
npm install -g jspm gulp
git clone https://github.com/ryanirilli/weather
cd weather/app
npm install
jspm install
cd ../api
npm install
```

## Run locally

Note: In order to run the app you need to set your 
`FORECAST_API_KEY` environment variable. 

from the root directory

### app server (livereload and serve static assets)

```
cd app
gulp serve

```

### api server 
in another terminal session

```
cd api
node index.js
```

