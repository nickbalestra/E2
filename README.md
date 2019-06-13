# E2
A Simple, Scalable and Easy starting point for full stack web development using JavaScript and Elm.

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
<br><br>

Please read the related blog post: [E2: Elm + Express for full-stack web development](http://nick.balestra.ch/2016/E2-full-stack-web-development-with-elm-and-express/) to know more about this stack and its relative boilerplate.

**NOTE!** Use the latest version of Node, 6.x.x.

## Installation

1. `git clone`
2. `npm install`

## Usage
### Development workflow - Hot reload
1. `npm start`
2.  open http://localhost:3000 in your favorite browser.
3.  edit any file in `./src` (i.e .elm source files or sass/css files) and take it from there

### Production workflow
1. `npm run build` to build assets for production, this will:
  - compile elm
  - compile sass, extract css applying prefixer on postprocessing
  - copy all the related bundles and files into a `/dist` directory.
2. `npm run prod` to serve them
3.  open http://localhost:3000 in your favorite browser.

Production `dist` directory structure:
```
dist/
  |index.html
  |static/
    |css/
      |hash.css
    |js/
      |main-hash.min.js
    ..
```

### Tests
[Elm-test](http://package.elm-lang.org/packages/elm-community/elm-test/latest) boilerplate included. To run the tests, simply run `npm test`

### APIs
Routes are organized following the express [route separation example](https://github.com/expressjs/express/blob/master/examples/route-separation)
Allowing for a quick prototypation of API endpoints together with the elm client.

A dummy `http://localhost:3000/color` endpoint is provided as reference. The endpoint return a random Elm color in the exadecimal format when hit with a get request.

### Elm-format, Standards JS and Precommit hook
  [Elm-format](https://github.com/avh4/elm-format) will take care of everything related to elm. For anything javascript related we'll rely on [standardJS](https://github.com/feross/standard).
  On `npm test` standard will check every .js file inside the `/server` and `/src` directories making sure they all comply to the standard javascript style.

***

## Elm by default
The project runs with Elm by default and hot replacement of changes to the modules. Currently it is on 0.17.1
A dummy Elm app, that consume the server API is provided as an example.

## Docker-compose usage
* To start server at port 3000, type the following command in terminal: 
  * docker-compose up 
* To stop server, type following command in terminal: 
  * docker-compose down 
