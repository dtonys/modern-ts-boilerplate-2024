# web-boilerplate-2024
A modern and simple web boilerplate for frontend or full stack projects.  Featuring react, webpack, and MUI.

## Run app in development mode

```
$ npm run build-dev     // build assets with hot reload
$ npm run server        // start api server
// open http://localhost:8080 in browser
```

## Run app in production mode:
```
$ npm run build-prod      // build minified assets to public folder
$ npm run server          // start api server
// open http://localhost:3000 in browser
```

### Linting
```
$ npm run lint          // run eslint and check all javascript for errors
```
eslint config inherits from the strict `airbnb` config, and can be configured in `.eslintrc.js`.
Your IDE should be integrated with ESLint to catch errors while writing code.


### File watching
nodemon is used to restart the server on code change. `nodemon.json` specifies which server directories and files will be watched to reload the server.

### Hot reloading
`@pmmmwh/react-refresh-webpack-plugin` will hot reload react components on change. Changes outside the react tree (Example: code changes in the entry point where react has not mounted yet) will trigger a hard page reload.

### Routing

Single page app routing can be achieved without complex libraries or integrations.

Use `onLinkClick` as an onClick handler for all link type components.

This will push to `window.history` to update the url, and dispatch a popstate event which will be caught by a top level router component.

On popstate, the router component will dynamically import (lazy load) the component and re-render the view.

See https://ncoughlin.com/posts/react-navigation-without-react-router/ for details.




