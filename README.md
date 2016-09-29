# webpack-express-elm-boilerplate
A boilerplate for running Elm with a Webpack workflow in Node express

[ ] TODO: Please read the related blog post: [The ultimate Elm Webpack setup](TODO) to know more about this boilerplate.

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
  index.html
  static/
    css/
      hash.css
    img/
      elm.png
    js/
      main-hash.min.js
```


### Tests
 [ ] TODO

### Standards JS and Precommit hook
  [Elm-format](https://github.com/avh4/elm-format) will take care of everything related to elm. For anything javascript related we'll rely on [standardJS](https://github.com/feross/standard).
  On `npm test` standard will check every .js file inside the `/server` and `/src` directories making sure they all comply to the standard javascript style.

***

## Elm by default
The project runs with Elm by default and hot replacement of changes to the modules. Currently it is on 0.17.1

## CSS
CSS files loaded into Main.js are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).
To turn off CSS Modules remove it from the `webpack.config.js` file.

