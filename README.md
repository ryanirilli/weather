## Why?

Because setting up a project can take a while, we thought it would be handy to make our tried and true front end development pipeline available to the world so any developer can use it. It's by no means the most sophisticated setup and we will surely get trolls complaining about some of our opinions, but hey, clone it, fork it, tear it apart, we really don't care.

## Install

At the time of publishing, we are using Node 5.4.1 but should work with version 4+. We highly recommend using [nvm](https://github.com/creationix/nvm) to manage your version of Node.

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
from the root directory

### app server (livereload and serve static assets)

```
cd app
gulp serve

```

### api server (dark skys api)
in another terminal session

```
cd api
node index.js
```

