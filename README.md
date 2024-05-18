# modern-ts-boilerplate-2024

A full stack typescript boilerplate.
Featuring react, express, webpack, and MUI.

## Rationale

A modern and reasonable starting point for modern projects with typescript.

## Typescript Integration

There are 2 tsconfig.json. One for the nodejs server and one for the browser client.

```
./tsconfig.json - The server config
./src/client/tsconfig.json - The client config
```

In our `.eslintrc.js`, we'll let eslint know that it should use the most local tsconfig.

```
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
```

## Run app in development mode

```
$ npm run dev           // typescript watch, webpack watch, start server
$ npm run server        // start api server
// open http://localhost:8080 in browser
```

## Run app in production mode:

```
$ npm run start         // typescript build, webpack build, start server
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
